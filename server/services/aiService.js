const axios = require("axios");

const ai = axios.create({
    baseURL: process.env.AI_ENGINE_URL,
    timeout: 60000,
});

async function generateReport(payload) {
    try {
        console.log("Sending payload:", payload);

        const response = await ai.post("/generate-report", payload);

        return response.data;
    } catch (err) {
        console.log(
            "FastAPI Error:",
            JSON.stringify(err.response?.data, null, 2)
        );
        throw err;
    }
}

module.exports = {
    generateReport,
};