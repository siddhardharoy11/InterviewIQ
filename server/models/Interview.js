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
        role: {
    type: String,
    default: "Backend Developer",
    },

    interviewType: {
        type: String,
        default: "Technical",
    },

    experienceLevel: {
        type: String,
        default: "Fresher",
    },

    interviewDuration: {
        type: Number,
        default: 30,
    },

    questionsAnswered: {
        type: Number,
        default: 0,
    },

    interviewerNotes: {
        type: String,
        default: "",
    },

    interviewerRatings: {
        technical: Number,
        communication: Number,
        problemSolving: Number,
        behavioral: Number,
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