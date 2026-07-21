const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        candidateName: {
            type: String,
            required: true,
            trim: true
        },

        candidateEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Uploaded",
                "Processing",
                "Completed",
                "Feedback Sent"
            ],
            default: "Draft"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Interview", interviewSchema);