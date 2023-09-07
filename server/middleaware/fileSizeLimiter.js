const MB = 50; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const fileName = Object.keys(files);
    const fileObj = files[fileName];

    if (fileObj.size > FILE_SIZE_LIMIT) {
        return res.status(413).json({
            status: "error",
            message: `Upload failed. File '${fileName}' is over the file size limit of ${MB}MB`,
        });
    }

    next();
};

module.exports = fileSizeLimiter;
