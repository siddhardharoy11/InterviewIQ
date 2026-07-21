const axios = require("axios");

const ai = axios.create({
    baseURL: process.env.AI_ENGINE_URL,
});

async function analyzeInterview(files) {
    const response = await ai.post("/analyze", files);
    return response.data;
}

module.exports = {
    analyzeInterview,
};