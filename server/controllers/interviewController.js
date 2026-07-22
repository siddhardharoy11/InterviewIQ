const Interview = require("../models/Interview");
const InterviewFile = require("../models/InterviewFile");
const Report = require("../models/Report");
const { generateReport: generateAIReport } = require("../services/aiService");

/* ----------------------------- */
/* Create Interview              */
/* ----------------------------- */

async function createInterview(req, res) {
    try {
        const {
        candidateName,
        candidateEmail,
        role,
        interviewType,
        experienceLevel,
        interviewDuration,
    } = req.body;

        const interview = await Interview.create({
    candidateName,
    candidateEmail,
    role,
    interviewType,
    experienceLevel,
    interviewDuration,
    }); 

        return res.status(201).json({
            success: true,
            data: interview,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

/* ----------------------------- */
/* Get All Interviews            */
/* ----------------------------- */

async function getInterviews(req, res) {
    try {
        const interviews = await Interview.find().sort({
            createdAt: -1,
        });

        return res.json({
            success: true,
            data: interviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

/* ----------------------------- */
/* Get Single Interview          */
/* ----------------------------- */

async function getInterview(req, res) {
    try {
        const { id } = req.params;

        const interview = await Interview.findById(id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found.",
            });
        }

        const files = await InterviewFile.findOne({
            interview: id,
        });

        const report = await Report.findOne({
            interview: id,
        });

        return res.json({
            success: true,
            data: {
                ...interview.toObject(),

                files: {
                    resume: files?.resume || null,
                    jobDescription: files?.jobDescription || null,
                    audio: files?.audio || null,
                    transcript: files?.transcript || null,
                },

                report: report || null,
            },
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

/* ----------------------------- */
/* Generic Upload Helper         */
/* ----------------------------- */

async function uploadFile(req, res, field) {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded.",
            });
        }

        let files = await InterviewFile.findOne({
            interview: id,
        });

        if (!files) {
            files = await InterviewFile.create({
                interview: id,
            });
        }

        files[field] = req.file.path;

        await files.save();

        return res.json({
            success: true,
            data: files,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

/* ----------------------------- */
/* Upload Wrappers               */
/* ----------------------------- */

function uploadResume(req, res) {
    return uploadFile(req, res, "resume");
}

function uploadJobDescription(req, res) {
    return uploadFile(req, res, "jobDescription");
}

function uploadAudio(req, res) {
    return uploadFile(req, res, "audio");
}

/* ----------------------------- */
/* Generate AI Report            */
/* ----------------------------- */

async function generateReport(req, res) {
    try {
        const { id } = req.params;

        const interview = await Interview.findById(id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found.",
            });
        }

        const files = await InterviewFile.findOne({
            interview: id,
        });

        if (!files || !files.resume) {
            return res.status(400).json({
                success: false,
                message: "Resume must be uploaded first.",
            });
        }

        let report = await Report.findOne({
            interview: id,
        });

        if (!report) {
            report = await Report.create({
                interview: id,
            });
        }

        report.status = "PROCESSING";
        await report.save();
console.log("Interview:", interview);

console.log("Files:", files);

console.log({
    candidateName: interview.candidateName,
    role: interview.role,
    interviewType: interview.interviewType,
    experienceLevel: interview.experienceLevel,

    interviewDuration: interview.interviewDuration,
    questionsAnswered: interview.questionsAnswered,

    resumePath: files.resume,
    jobDescriptionPath: files.jobDescription || "",
    audioPath: files.audio || "",

    interviewerNotes: interview.interviewerNotes,
    interviewerRatings: interview.interviewerRatings,
});
    const aiReport = await generateAIReport({
        candidateName: interview.candidateName,

        role: interview.role,
        interviewType: interview.interviewType,
        experienceLevel: interview.experienceLevel,

        interviewDuration: interview.interviewDuration,
        questionsAnswered: interview.questionsAnswered,

        resumePath: files.resume,
        jobDescriptionPath: files.jobDescription || "",
        audioPath: files.audio || "",

        interviewerNotes: interview.interviewerNotes || "",
        interviewerRatings: interview.interviewerRatings || {},
    });

        report.status = "COMPLETED";

        Object.assign(report, aiReport);

        await report.save();

        return res.json({
            success: true,
            data: report,
        });

    } catch (err) {

        console.error(err);

        await Report.findOneAndUpdate(
            { interview: req.params.id },
            { status: "FAILED" }
        );

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    createInterview,
    getInterviews,
    getInterview,
    uploadResume,
    uploadJobDescription,
    uploadAudio,
    generateReport,
};