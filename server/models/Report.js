const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
        required: true,
        unique: true,
    },

    status: {
        type: String,
        enum: [
            "PENDING",
            "PROCESSING",
            "COMPLETED",
            "FAILED",
        ],
        default: "PENDING",
    },

scores: mongoose.Schema.Types.Mixed,

summary: String,

strengths: [String],

weaknesses: [String],

recommendations: [String],

resumeAnalysis: mongoose.Schema.Types.Mixed,

technicalAnalysis: mongoose.Schema.Types.Mixed,

communicationAnalysis: mongoose.Schema.Types.Mixed,

candidateFeedback: mongoose.Schema.Types.Mixed,
},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "Report",
    reportSchema
);