const { createUploader } = require("../config/multer");

const uploadResume = createUploader(
    "uploads/resumes",
    ["application/pdf"]
);

const uploadJobDescription = createUploader(
    "uploads/job-descriptions",
    ["application/pdf"]
);

const uploadAudio = createUploader(
    "uploads/audio",
    [
        "audio/mpeg",
        "audio/wav",
        "audio/x-wav",
        "audio/mp4",
        "audio/x-m4a",
        "audio/webm"
    ]
);

module.exports = {
    uploadResume,
    uploadJobDescription,
    uploadAudio,
};