const AWS = require("aws-sdk");

const accessKeyId = "4A06I973DO6OA4EDM5M0";
const secretAccessKey = "TBaCrRX6Asi62p3ffIC6ozSFdqanJ7ylrHKFKztv";
const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");

exports.getVideo = (callback) => {
    const params = {
        Bucket: "dance-keep-videos",
        Key: "stream_test.mp4",
    };

    const s3 = new AWS.S3({
        endpoint: wasabiEndpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    });

    s3.getObject(params, function (err, data) {
        if (!err) {
            return callback(data, null);
        } else {
            // console.log(err);
            return callback(null, err);
        }
    });
};

exports.getVideoStream = async (res, range) => {
    const params = {
        Bucket: "dance-keep-videos",
        Key: "stream_test.mp4",
        Range: range,
    };

    const s3 = new AWS.S3({
        endpoint: wasabiEndpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    });

    s3.headObject(params, function (err, data) {
        if (err) {
            console.error(err);
        }

        // replace with value from db
        const videoSize = 33807403;
        const chunkSize = 1 * 1e6;
        const start = Number(range.replace(/\D/g, ""));
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

        const stream = s3.getObject(params).createReadStream();

        stream.on("error", function error(err) {
            console.log("\n[-] Stream error\n");
            console.log(err);
            return;
        });

        stream.on("end", () => {
            console.log("\n[+] Stream finished\n");
            stream.end();
        });

        stream.pipe(res);
    });
};
