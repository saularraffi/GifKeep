const AWS = require("aws-sdk");

const accessKeyId = "4A06I973DO6OA4EDM5M0";
const secretAccessKey = "TBaCrRX6Asi62p3ffIC6ozSFdqanJ7ylrHKFKztv";

const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");
const s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});

exports.getVideo = (callback) => {
    const params = {
        Bucket: "dance-keep-videos",
        Key: "stream_test.mp4",
    };

    s3.getObject(params, function (err, data) {
        if (!err) {
            return callback(data, null);
        } else {
            // console.log(err);
            return callback(null, err);
        }
    });
};

exports.getVideoStream = (res) => {
    const params = {
        Bucket: "dance-keep-videos",
        Key: "stream_test.mp4",
    };

    s3.headObject(params, function (err, data) {
        if (err) {
            console.error(err);
        }

        const stream = s3.getObject(params).createReadStream();

        stream.on("error", function error(err) {
            console.log(err);
        });

        // res.set("Content-Type", mime.lookup(key));
        res.set("Content-Type", "video/mp4");
        res.set("Content-Length", data.ContentLength);
        res.set("Last-Modified", data.LastModified);
        res.set("ETag", data.ETag);

        stream.on("end", () => {
            console.log("Stream finished");
        });

        stream.pipe(res);
    });
};
