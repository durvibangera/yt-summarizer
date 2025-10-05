# 🚀 YouTube Video Summarizer

A browser extension and Python backend that generates summaries for any YouTube video, either by using its existing transcript or by transcribing the audio with OpenAI's Whisper model.

---

## Key Features ✨

* **Dual Mode Operation:** Automatically scrapes the existing transcript if available for a quick summary.
* **Audio Transcription:** If no transcript is found, it downloads the video's audio and transcribes it using a powerful speech-to-text model.
* **AI-Powered Summarization:** Uses a Hugging Face Transformer model to create concise and relevant summaries.
* **Simple UI:** An easy-to-use Chrome extension interface to trigger the process.

---

## Tech Stack 🛠️

* **Backend:** Python, Flask, Transformers (Hugging Face), openai-whisper, yt-dlp
* **Frontend:** HTML, CSS, JavaScript (as a Chrome Extension)
* **Core Dependency:** FFmpeg

---

## Folder Structure

The project is organized into two main parts:

* `📁 backend-server/`: Contains the Python Flask API that handles all the heavy lifting (downloading, transcribing, and summarizing).
* `📁 chrome-extension/`: Contains the frontend code for the Chrome extension that the user interacts with.

---

## Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

Make sure you have the following installed:
* [Python 3.8+](https://www.python.org/downloads/)
* [FFmpeg](https://ffmpeg.org/download.html) (This is crucial for audio processing. Ensure it's installed and accessible in your system's PATH).

### 1. Backend Setup

First, set up and run the Python server.

```bash
# 1. Navigate to the backend directory
cd backend-server

# 2. Create and activate a virtual environment
# On Windows:
# python -m venv venv
# .\venv\Scripts\activate
# On macOS/Linux:
# python -m venv venv
# source venv/bin/activate

# 3. Install the required Python packages
pip install -r requirements.txt

# 4. Run the Flask server
# This will start the server on [http://127.0.0.1:5000](http://127.0.0.1:5000)
python app.py
````

**Leave this terminal running.** It's your server.

### 2. Frontend Setup

Next, load the extension into your browser.

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Enable **"Developer mode"** in the top-right corner.
3.  Click the **"Load unpacked"** button.
4.  Select the `chrome-extension` folder from the project directory.
5.  The extension icon should now appear in your browser's toolbar.

-----

## How to Use ▶️

1.  Navigate to any YouTube video you want to summarize.
2.  Click the extension's icon in the toolbar to open the popup.
3.  Click the **"Summarize Video"** button.
4.  The status will update, and the summary will appear in the popup once it's ready. If the video has no transcript, this process may take a few minutes.

-----

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
