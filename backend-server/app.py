from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import whisper  # Import whisper
import yt_dlp   # Import yt-dlp
import os       # To help with file management

app = Flask(__name__)
CORS(app)

# --- Load Models (this can take time on first run) ---
# 1. Summarization Model (same as before)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# 2. Speech-to-Text Model (Whisper)
#    "base" is a good starting point. Other options: "tiny", "small", "medium", "large"
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("Whisper model loaded.")


# --- Original Endpoint (for videos with existing transcripts) ---
@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text_to_summarize = data['text']
    summary = summarizer(text_to_summarize, max_length=150, min_length=30, do_sample=False)
    return jsonify({'summary': summary[0]['summary_text']})


# --- NEW Endpoint (for videos without transcripts) ---
@app.route('/summarize_from_url', methods=['POST'])
def summarize_from_url():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({'error': 'No URL provided'}), 400

    video_url = data['url']
    audio_file = "downloaded_audio.mp3"

    try:
        # Step 1: Download Audio using yt-dlp
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': 'downloaded_audio' # name for the downloaded file without extension
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
        
        # Step 2: Transcribe Audio using Whisper
        print("Transcribing audio...")
        transcription_result = whisper_model.transcribe(audio_file)
        transcript = transcription_result['text']
        print("Transcription complete.")

        # Step 3: Summarize the new transcript
        print("Summarizing transcript...")
        summary = summarizer(transcript, max_length=150, min_length=30, do_sample=False)
        print("Summarization complete.")

        return jsonify({'summary': summary[0]['summary_text']})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Step 4: Clean up by deleting the downloaded audio file
        if os.path.exists(audio_file):
            os.remove(audio_file)


if __name__ == '__main__':
    app.run(debug=True, port=5000)