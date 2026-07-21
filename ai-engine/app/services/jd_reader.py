from app.services.pdf_reader import extract_pdf_text


def extract_job_description_text(path: str) -> str:
    return extract_pdf_text(path)