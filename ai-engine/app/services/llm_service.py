import os
import json

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.prompts.report_prompt import build_report_prompt

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL = "gemini-3.5-flash"
# MODEL = "gemini-2.5-flash"


def generate_interview_report(
    resume,
    job_description,
    transcript,

    interviewer_notes,
    interviewer_ratings,

    role,
    interview_type,
    experience_level,

    interview_duration,
    questions_answered,
):

    prompt = build_report_prompt(
    resume=resume,
    job_description=job_description,
    transcript=transcript,

    interviewer_notes=interviewer_notes,
    interviewer_ratings=interviewer_ratings,

    role=role,
    interview_type=interview_type,
    experience_level=experience_level,

    interview_duration=interview_duration,
    questions_answered=questions_answered,
)

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json",
        ),
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"Gemini returned invalid JSON:\n\n{response.text}"
        ) from e