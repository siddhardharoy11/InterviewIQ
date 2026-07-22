from pathlib import Path

from app.services.pdf_reader import extract_pdf_text

# Project root (InterviewIQ/)
PROJECT_ROOT = Path(__file__).resolve().parents[3]


def extract_resume_text(path: str) -> str:
    resume_path = PROJECT_ROOT / "server" / Path(path)

    return extract_pdf_text(str(resume_path))