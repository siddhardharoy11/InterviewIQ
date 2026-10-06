const { createUploader } = require("../config/multer");

const uploadResume = createUploader(
    "uploads/resumes",
    ["application/pdf"],
    "resume"
);

const uploadJobDescription = createUploader(
    "uploads/job-descriptions",
    ["application/pdf"],
    "jobDescription"
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
    ],
    "audio"
);

module.exports = {
    uploadResume,
    uploadJobDescription,
    uploadAudio
};