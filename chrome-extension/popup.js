document.getElementById('summarizeBtn').addEventListener('click', () => {
  const status = document.getElementById('status');
  const summaryDiv = document.getElementById('summary');

  status.textContent = 'Getting transcript...';
  summaryDiv.textContent = '';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    
    // First, try to get the transcript from the page
    chrome.tabs.sendMessage(activeTab.id, { action: "getTranscript" }, (response) => {
      // Check if scraping was successful
      if (response && response.transcript) {
        status.textContent = 'Transcript found on page! Summarizing...';
        summarizeText(response.transcript); // Use existing transcript
      } else {
        // FALLBACK: If scraping failed, use the URL
        status.textContent = 'No transcript on page. Transcribing audio... (this may take a while)';
        summarizeFromUrl(activeTab.url); // Use the new audio transcription method
      }
    });
  });
});

async function summarizeText(transcript) {
  // This function is for the original method
  const status = document.getElementById('status');
  const summaryDiv = document.getElementById('summary');
  try {
    const response = await fetch('http://127.0.0.1:5000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: transcript }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    status.textContent = 'Summary:';
    summaryDiv.textContent = data.summary;
  } catch (error) {
    status.textContent = 'Failed to summarize text.';
    console.error("Error:", error);
  }
}

async function summarizeFromUrl(url) {
  // This is the new function for the fallback method
  const status = document.getElementById('status');
  const summaryDiv = document.getElementById('summary');
  try {
    const response = await fetch('http://127.0.0.1:5000/summarize_from_url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    status.textContent = 'Summary:';
    summaryDiv.textContent = data.summary;
  } catch (error) {
    status.textContent = 'Failed to transcribe and summarize.';
    console.error("Error:", error);
  }
}