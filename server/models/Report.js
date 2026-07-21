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

        overallSummary: String,

        resumeMatch: Number,

        technicalStrengths: [String],

        technicalWeaknesses: [String],

        communication: String,

        resumeSuggestions: [String],

        topicsToImprove: [String],

        learningResources: [String],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Report",
    reportSchema
);