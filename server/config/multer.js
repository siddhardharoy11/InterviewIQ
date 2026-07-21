const multer = require("multer");
const path = require("path");
const fs = require("fs");

function createUploader(folder, allowedMimeTypes) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, folder);
        },
        filename(req, file, cb) {
            cb(
                null,
                `${Date.now()}-${file.originalname}`
            );
        },
    });

    return multer({
        storage,
        fileFilter(req, file, cb) {
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("Invalid file type"));
            }
        },
    }).single("file");
}

module.exports = {
    createUploader,
};