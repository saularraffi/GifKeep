const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

const endpoint = "/api/videos";

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

router.get(`${endpoint}/:key`, (req, res) => {
    const { range } = req.headers;
    const { key } = req.params;

    const params = {
        Bucket: "dance-keep-videos",
        Key: `${key}.mp4`,
    };

    s3.headObject(params, function (err, data) {
        if (err) {
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
        Bucket: "dance-keep-thumbnails",
        Key: `${key}.png`,
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            if (err.code === "NoSuchKey") {
                res.status(404).send(
                    `Could not find resource with key ${params.Key}`
                );
            } else {
                res.status(500).send("Unknown error");
            }
        } else {
            res.status(200).send(data.Body);
        }
    });
});

module.exports = router;
