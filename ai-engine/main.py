from fastapi import FastAPI
from app.schemas import AnalyzeRequest
from app.services.resume_reader import extract_resume_text
from app.services.report_generator import generate_report
from fastapi import HTTPException   
app = FastAPI()


@app.post("/generate-report")
async def generate_report_endpoint(payload: AnalyzeRequest):

    try:

        report = generate_report(
        resume_path=payload.resumePath,
        jd_path=payload.jobDescriptionPath,
        audio_path=payload.audioPath,

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