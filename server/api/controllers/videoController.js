const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../../middleaware/filesPayloadExists");
const fileSizeLimiter = require("../../middleaware/fileSizeLimiter");
const fileExtLimiter = require("../../middleaware/fileExtLimiter");
const ffmpeg = require("fluent-ffmpeg");
const { CompareSharp } = require("@mui/icons-material");

const endpoint = "/api/videos";

const videoOutputDir = path.join(__dirname, "../..", "videos");
const thumbnailOutputDir = path.join(__dirname, "../..", "thumbnails");

const videoBucketName = "dance-keep-videos";
const thumbnailBucketName = "dance-keep-thumbnails";

const accessKeyId = "4A06I973DO6OA4EDM5M0";
const secretAccessKey = "TBaCrRX6Asi62p3ffIC6ozSFdqanJ7ylrHKFKztv";
const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");

const s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    httpOptions: {
        timeout: 60_000,
    },
});

router.get(`${endpoint}/:key`, (req, res) => {
    const { range } = req.headers;
    const { key } = req.params;

    const params = {
        Bucket: videoBucketName,
        Key: `${key}.mp4`,
    };

    s3.headObject(params, function (err, data) {
        if (err) {
            console.log(`[-] Error getting file ${key}.mp4`);
            console.error(err);
        }

        const videoStream = getVideoStream(params, range);

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : data.ContentLength - 1;
            const contentLength = end - start + 1;

            const headers = {
                "Content-Range": `bytes ${start}-${end}/${data.ContentLength}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };

            res.writeHead(206, headers);
            videoStream.pipe(res);
        } else {
            const headers = {
                "Content-Length": data.ContentLength,
                "Content-Type": "video/mp4",
            };

            res.writeHead(200, headers);
            videoStream.pipe(res);
        }
    });
});

router.get(`${endpoint}/thumbnail/:key`, (req, res) => {
    const { key } = req.params;

    const params = {
        Bucket: thumbnailBucketName,
        Key: `${key}.jpg`,
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(`[-] Error getting file ${key}.jpg`);
            console.log(err);
            if (err.code === "NoSuchKey") {
                res.status(404).send(
                    `[-] Could not find resource with key ${params.Key}`
                );
            } else {
                res.status(500).send("Unknown error");
            }
        } else {
            res.status(200).send(data.Body);
        }
    });
});

router.post(
    endpoint,
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileSizeLimiter,
    fileExtLimiter([".mp4"]),
    (req, res) => {
        const id = req.body.noteId;
        const files = req.files;
        const fileKey = Object.keys(files)[0];
        const fileObj = files[fileKey];

        const videoKey = `${id}${path.extname(fileObj.name)}`;
        const thumbnailKey = `${id}.jpg`;
        const videoFilePath = path.join(videoOutputDir, videoKey);
        const thumbnailFilePath = path.join(thumbnailOutputDir, thumbnailKey);

        fileObj.mv(videoFilePath, async (err) => {
            if (err)
                return res.status(500).json({ status: "error", message: err });

            await uploadFiles(
                thumbnailKey,
                videoKey,
                thumbnailFilePath,
                videoFilePath
            );

            deleteLocalFile(thumbnailFilePath);
            deleteLocalFile(videoFilePath);
        });

        return res.json({
            status: "success",
            message: `Successfully uploaded file '${fileObj.name}'`,
        });
    }
);

router.delete(endpoint, (req, res) => {
    const { id } = req.query;

    deleteFileFromS3(`${id}.mp4`, videoBucketName)
        .then((data) => {
            console.log(`[+] Successfully deleted file ${id}.mp4`);
            res.status(500).send(`Successfully deleted file ${id}.mp4`);
        })
        .catch((err) => {
            console.log(`[-] Error deleting file ${id}.mp4`);
            console.log(err);
            res.status(500).send("Error deleting file");
        });

    deleteFileFromS3(`${id}.jpg`, thumbnailBucketName).catch((err) => {
        console.log(`[-] Error deleting file ${id}.jpg`);
        console.log(err);
    });
});

function deleteFileFromS3(key, bucket) {
    var params = {
        Bucket: bucket,
        Key: key,
    };

    const customPromise = new Promise(async (resolve, reject) => {
        s3.deleteObject(params, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });

    return customPromise;
}

function getVideoStream(params, range) {
    const videoObjectParams = range ? { ...params, Range: range } : params;

    const videoObject = s3.getObject(videoObjectParams);
    const videoStream = videoObject.createReadStream();

    videoStream.on("end", () => {
        console.log("[+] Stream finished");
    });

    videoStream.on("error", () => {
        console.log("[-] Stream error");
    });

    return videoStream;
}

function uploadFiles(thumbnailKey, videoKey, thumbnailFilePath, videoFilePath) {
    const customPromise = new Promise(async (resolve, reject) => {
        await extractFirstFrame(thumbnailKey, videoFilePath);
        uploadFileToS3(thumbnailKey, thumbnailFilePath, thumbnailBucketName);
        uploadFileToS3(videoKey, videoFilePath, videoBucketName);
        resolve();
    });

    return customPromise;
}

function extractFirstFrame(imageKey, videoFilePath) {
    const customPromise = new Promise((resolve, reject) => {
        ffmpeg(videoFilePath)
            .screenshots({
                count: 1, // Number of screenshots to take (1 for the first frame)
                folder: thumbnailOutputDir, // Folder to save the image
                filename: imageKey, // Output image file name
            })
            .on("end", () => resolve())
            .on("error", (err) => {
                console.error("[-] Error extracting first frame:", err);
                reject();
            });
    });

    return customPromise;
}

function uploadFileToS3(fileKey, filePath, bucketName) {
    const fileData = fs.readFileSync(filePath);

    s3.upload(
        {
            Bucket: bucketName,
            Key: fileKey,
            Body: fileData,
        },
        (err, data) => {
            if (err) {
                console.log(`[-] Failed to upload file. ${data.Location}`);
                console.error(err);
            } else {
                console.log(`[+] File uploaded successfully. ${data.Location}`);
            }
        }
    );
}

function deleteLocalFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(`[-] Failed to delete file ${filePath}`);
        } else {
            console.log(`[+] Successfully deleted file ${filePath}`);
        }
    });
}

module.exports = router;
