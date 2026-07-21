import fitz


def extract_pdf_text(path: str) -> str:
    """
    Extract all text from any PDF.
    """

    document = fitz.open(path)

    text = []

    for page in document:
        text.append(page.get_text())

    document.close()

    return "\n".join(text).strip()  