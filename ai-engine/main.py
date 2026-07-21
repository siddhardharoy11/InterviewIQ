from fastapi import FastAPI, HTTPException
from app.schemas import AnalyzeRequest
from app.services.report_generator import generate_report

app = FastAPI()


@app.post("/generate-report")
async def generate_report_endpoint(payload: AnalyzeRequest):
    try:
        report = generate_report(
            resume_path=payload.resumePath,
            jd_path=payload.jobDescriptionPath,
            audio_path=payload.audioPath,
            interviewer_notes=payload.interviewerNotes,
            interviewer_ratings=payload.interviewerRatings,

            role=payload.role,
            interview_type=payload.interviewType,
            experience_level=payload.experienceLevel,

            interview_duration=payload.interviewDuration,
            questions_answered=payload.questionsAnswered,
        )

        return report

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )