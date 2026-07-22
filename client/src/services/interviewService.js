import api from "./api";

/* ----------------------------- */
/* Interviews                    */
/* ----------------------------- */

export async function getInterviews() {
    const response = await api.get("/interviews");
    return response.data.data;
}

export async function getInterview(id) {
    const response = await api.get(`/interviews/${id}`);
    return response.data.data;
}

export async function createInterview(data) {
    const response = await api.post("/interviews", data);
    return response.data.data;
}

/* ----------------------------- */
/* File Upload                   */
/* ----------------------------- */

export async function uploadInterviewFile(
    interviewId,
    type,
    file
) {
    const formData = new FormData();
   const fieldMap = {
    resume: "resume",
    "job-description": "jobDescription",
    audio: "audio",
};

formData.append(fieldMap[type], file);

    const response = await api.post(
        `/interviews/${interviewId}/upload/${type}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
}

/* ----------------------------- */
/* AI Report                     */
/* ----------------------------- */

export async function generateAIReport(id) {
    const response = await api.post(
        `/interviews/${id}/analyze`
    );

    return response.data;
}