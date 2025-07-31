// For testing on Computer: 'http://127.0.0.1:5000'
// For testing on your Phone: 'http://192.168.1.5:5000' (Replace it with your IP Adress)
const BACKEND_URL = 'https://senior-vision-ai.onrender.com/api/scan';

const cameraInput = document.getElementById('cameraInput');
const scanButton = document.getElementById('scanButton');
const statusText = document.getElementById('statusText');

scanButton.addEventListener('click', () => {
    cameraInput.click();
});

cameraInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    statusText.textContent = 'Scanning... Please wait.';
    scanButton.disabled = true;

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            const summary = result.summary;
            statusText.textContent = summary;
            speakText(summary);
        } else {
            throw new Error(result.error || 'An unknown error occurred.');
        }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = `Sorry, something went wrong. Please try again.`;
        statusText.textContent = errorMessage;
        speakText(errorMessage);
    } finally {
        scanButton.disabled = false;
        cameraInput.value = '';
    }
});

function speakText(text) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.9;     
    window.speechSynthesis.speak(utterance);
}