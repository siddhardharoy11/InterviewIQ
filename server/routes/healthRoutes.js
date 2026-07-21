const express = require("express");
const router = express.Router();

const { pingAI } = require("../services/aiService");

router.get("/", async (req, res) => {
    try {
        const ai = await pingAI();

        res.json({
            backend: "Running",
            ai
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;