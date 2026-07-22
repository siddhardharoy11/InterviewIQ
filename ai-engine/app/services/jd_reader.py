from pathlib import Path

from app.services.pdf_reader import extract_pdf_text

PROJECT_ROOT = Path(__file__).resolve().parents[3]


def extract_job_description_text(path: str) -> str:
    jd_path = PROJECT_ROOT / "server" / Path(path)

    return extract_pdf_text(str(jd_path))