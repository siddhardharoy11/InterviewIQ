from pathlib import Path

import whisper

# Load the model only once
model = whisper.load_model("base")

# Project root (InterviewIQ/)
PROJECT_ROOT = Path(__file__).resolve().parents[3]


def transcribe_audio(audio_path: str) -> str:
    """
    Transcribes an interview audio file using Whisper.
    """

    full_audio_path = PROJECT_ROOT / "server" / Path(audio_path)

    result = model.transcribe(str(full_audio_path))

    return result["text"].strip()