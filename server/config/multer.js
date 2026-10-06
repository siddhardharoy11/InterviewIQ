const multer = require("multer");
const path = require("path");
const fs = require("fs");
function createUploader(destination, allowedTypes, fieldName) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.resolve(destination);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName =
                `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`
                ),
                false
            );
        }
    };
    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 50 * 1024 * 1024
        }
    }).single(fieldName);
}
module.exports = {
    createUploader
};