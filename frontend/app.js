// --- CONFIGURATION ---
// IMPORTANT: Use 'http://127.0.0.1:5000' for testing on your computer.
// For testing on your phone, replace with your computer's local network IP address.
// Example: 'http://192.168.1.5:5000'
const BACKEND_URL = 'https://senior-vision-ai.onrender./api/scan';

// --- GET HTML ELEMENTS ---
const cameraInput = document.getElementById('cameraInput');
const scanButton = document.getElementById('scanButton');
const statusText = document.getElementById('statusText');

// --- EVENT LISTENERS ---

// When the user clicks the main "Scan Product" button, trigger the hidden file input
scanButton.addEventListener('click', () => {
    cameraInput.click();
});

// When the user has taken a picture, this event is fired
cameraInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
        return; // User cancelled the camera
    }

    // Show a loading message
    statusText.textContent = 'Scanning... Please wait.';
    scanButton.disabled = true;

    // Send the image to the backend
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            // Success! Display and speak the summary.
            const summary = result.summary;
            statusText.textContent = summary;
            speakText(summary);
        } else {
            // Handle errors from the backend
            throw new Error(result.error || 'An unknown error occurred.');
        }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = `Sorry, something went wrong. Please try again.`;
        statusText.textContent = errorMessage;
        speakText(errorMessage);
    } finally {
        // Re-enable the button and clear the file input for the next scan
        scanButton.disabled = false;
        cameraInput.value = ''; // Reset the input
    }
});

// --- TEXT-TO-SPEECH FUNCTION ---
function speakText(text) {
    // Stop any speech that is currently active
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language
    utterance.rate = 0.9;     // Make it speak a little slower
    window.speechSynthesis.speak(utterance);
}