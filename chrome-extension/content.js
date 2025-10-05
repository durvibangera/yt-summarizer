// This function will be triggered by a message from the popup.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTranscript") {
    const transcriptLines = document.querySelectorAll("ytd-transcript-segment-renderer yt-formatted-string");
    if (transcriptLines.length > 0) {
      let fullTranscript = "";
      transcriptLines.forEach(line => {
        fullTranscript += line.textContent + " ";
      });
      sendResponse({ transcript: fullTranscript.trim() });
    } else {
      sendResponse({ error: "Transcript not found. Please make sure the transcript is open on the YouTube page." });
    }
  }
  return true; // Keep the message channel open for the asynchronous response.
});