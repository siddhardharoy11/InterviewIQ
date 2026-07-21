from app.services.whisper_service import transcribe_audio

text = transcribe_audio(
    r"C:\Users\HP\Desktop\sample.webm"
)

print(text)