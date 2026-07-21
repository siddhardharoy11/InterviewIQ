const express = require("express");

const {
    createInterview,
    getInterviews,
    getInterview,
    uploadResume,
    uploadJobDescription,
    uploadAudio,
    generateReport,
} = require("../controllers/interviewController");

const {
    uploadResume: resumeMiddleware,
    uploadJobDescription: jdMiddleware,
    uploadAudio: audioMiddleware,
} = require("../middlewares/uploadMiddlewares");

const router = express.Router();

router.post("/", createInterview);
router.get("/", getInterviews);
router.get("/:id", getInterview);

router.post("/:id/upload/resume", resumeMiddleware, uploadResume);

router.post(
    "/:id/upload/job-description",
    jdMiddleware,
    uploadJobDescription
);

router.post(
    "/:id/upload/audio",
    audioMiddleware,
    uploadAudio
);

router.post("/:id/analyze", generateReport);

module.exports = router;