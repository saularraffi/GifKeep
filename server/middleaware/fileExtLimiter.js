const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files;
        const fileName = Object.keys(files);
        const fileExt = path.extname(files[fileName].name);

        if (!allowedExtArray.includes(fileExt)) {
            console.log(
                `File extension ${fileExt} not allowed.  Only ${allowedExtArray
                    .toString()
                    .replace(",", ", ")} are allowed`
            );

            return res.status(422).json({
                status: "error",
                message: `File extension ${fileExt} not allowed. Only ${allowedExtArray
                    .toString()
                    .replace(",", ", ")} are allowed`,
            });
        }

        next();
    };
};

module.exports = fileExtLimiter;
