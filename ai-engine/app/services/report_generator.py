from app.services.resume_reader import extract_resume_text
from app.services.jd_reader import extract_job_description_text
from app.services.whisper_service import transcribe_audio
from app.services.llm_service import generate_interview_report


def generate_report(
    resume_path: str,
    jd_path: str,
    audio_path: str,

    role: str,
    interview_type: str,
    experience_level: str,

    interview_duration: int,
    questions_answered: int,
):
    # Extract resume
    resume_text = extract_resume_text(resume_path)

    # Extract job description
    jd_text = ""
    if jd_path:
        jd_text = extract_job_description_text(jd_path)

    # Transcribe interview audio
    transcript = ""
    if audio_path:
        try:
            transcript = transcribe_audio(audio_path)
        except Exception as e:
            print(f"Transcription failed: {e}")
            transcript = ""

    # Generate AI report
    report = generate_interview_report(
    resume=resume_text,
    job_description=jd_text,
    transcript=transcript,

    role=role,
    interview_type=interview_type,
    experience_level=experience_level,

    interview_duration=interview_duration,
    questions_answered=questions_answered,
)

    # Calculate overall score deterministically
    scores = report["scores"]

    technical = scores["technical"]["score"]
    communication = scores["communication"]["score"]
    problem_solving = scores["problemSolving"]["score"]
    behavioral = scores["behavioral"]["score"]
    resume_match = scores["resumeMatch"]["score"]

    SCORE_WEIGHTS = {
    "technical": 0.35,
    "communication": 0.20,
    "problemSolving": 0.20,
    "behavioral": 0.10,
    "resumeMatch": 0.15,
    }
    overall = round(
    scores["technical"]["score"] * SCORE_WEIGHTS["technical"]
    + scores["communication"]["score"] * SCORE_WEIGHTS["communication"]
    + scores["problemSolving"]["score"] * SCORE_WEIGHTS["problemSolving"]
    + scores["behavioral"]["score"] * SCORE_WEIGHTS["behavioral"]
    + scores["resumeMatch"]["score"] * SCORE_WEIGHTS["resumeMatch"],
    1,
)

    report["scores"]["overall"] = overall

    return report