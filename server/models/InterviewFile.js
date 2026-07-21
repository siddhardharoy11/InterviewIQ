const mongoose = require("mongoose");

const interviewFileSchema = new mongoose.Schema(
    {
        interview: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview",
            required: true,
        },

        resume: String,

        jobDescription: String,

        audio: String,

        transcript: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "InterviewFile",
    interviewFileSchema
);