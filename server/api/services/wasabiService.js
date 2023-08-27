const AWS = require("aws-sdk");

const accessKeyId = "4A06I973DO6OA4EDM5M0";
const secretAccessKey = "TBaCrRX6Asi62p3ffIC6ozSFdqanJ7ylrHKFKztv";
const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");
const s3Config = {
    endpoint: wasabiEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
};
const s3 = new AWS.S3({
    ...s3Config,
    httpOptions: {
        timeout: 60_000,
    },
});

exports.getVideo = (callback) => {
    const params = {
        Bucket: "dance-keep-videos",
        Key: "test.txt",
    };

    const s3 = new AWS.S3({ ...s3Config });

    s3.getObject(params, function (err, data) {
        if (!err) {
            return callback(data, null);
        } else {
            // console.log(err);
            return callback(null, err);
        }
    });
};

function getStartFromRange(range) {
    const rangeNum = range.replace("bytes=", "").split("-")[0];
    return Number(rangeNum?.replace(/\D/g, ""));
}

exports.getVideoStream = async (req, res, range) => {
    const params = {
        Bucket: "dance-keep-videos",
        Key: "stream_test.mp4",
    };

    s3.headObject(params, function (err, data) {
        if (err) {
            console.error(err);
        }

        const videoSize = data.ContentLength;
        const chunkSize = 1 * 1e6;
        const start = getStartFromRange(range);
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;

        console.log(
            `start=${start} end=${end} ${range} vidSize=${videoSize} contLen=${contentLength}`
        );

        // res.set("Content-Type", mime.lookup(key));
        res.set("Content-Range", `bytes ${start}-${end}/${videoSize}`);
        res.set("Content-Type", "video/mp4");
        res.set("Content-Length", contentLength);
        res.set("Last-Modified", data.LastModified);
        res.set("ETag", data.ETag);

        res.writeHead(206);

        const stream = s3
            .getObject({ ...params, Range: range })
            .createReadStream({ start, end });

        stream.on("error", function error(err) {
            console.log("\n[-] Stream error\n");
            // console.log(err);
            // return;
        });

        stream.on("end", () => {
            console.log("\n[+] Stream finished\n");
            stream.end();
            return "done";
        });

        // req.on("close", () => stream.end());

        return stream.pipe(res);
    });
};
