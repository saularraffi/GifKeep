const express = require("express");
const wasabiService = require("../services/wasabiService");
const stream = require("stream");
const router = express.Router();
const fs = require("fs");

const endpoint = "/api/video";

router.get(endpoint, (req, res) => {
    const range = req.headers.range;

    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    const videoPath = "./videos/stream_test.mp4";
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;

    console.log(
        `start=${start} end=${end} ${range} vidSize=${videoSize} contLen=${contentLength}`
    );

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
});

router.get(`${endpoint}/download`, (req, res) => {
    wasabiService.getVideo((data) => {
        const bytes = data.Body;
        const bytesLength = Buffer.byteLength(bytes);
        const bytesString = String.fromCharCode(...bytes);

        const buffer = new Buffer(bytes, "base64");
        const readable = new stream.Readable();
        readable._read = () => {};
        readable.push(buffer);
        readable.push(null);

        console.log(buffer);
        console.log(`file content: ${bytesString}`);
    });
    res.send("OK");
});

router.get(`${endpoint}/stream`, (req, res) => {
    const range = req.headers.range;

    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    wasabiService.getVideoStream(res, range);
});

module.exports = router;
