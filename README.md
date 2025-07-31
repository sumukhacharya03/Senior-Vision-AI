# Senior-Vision-AI

**App Name**: **Scan-n-Say**

AI-powered mobile assistant app designed to help the elderly and visually impaired during supermarket shopping by scanning supermarket products and reading out a simple, clear summary; while also displaying it in large high-contrast text.

https://github.com/user-attachments/assets/2e6a179d-7534-4843-b216-eff18643869d

## What is this Project about?

Many elderly individuals struggle to read the small print on supermarket products—whether it's due to vision issues, complicated labels, or unfamiliar terms. **Scan-n-Say** is a simple, smart scanning app that solves this problem.

Users can take a picture of any product, and the app will use OCR to extract the important information and then use AI to generate a friendly, simple summary, and read it out loud. This makes supermarket shopping easier, more independent, and far more enjoyable for users especially for the elderly and visually-impared.

### Key Features:

* **Instant Scan:** Uses the phone's camera to capture product packaging.
* **AI-Powered Summaries:** Leverages Google's Vision (OCR) and Gemini (LLM) APIs to extract text and create simple, helpful summaries.
* **Text-to-Speech:** Reads the summary aloud so there's no need to squint at the screen.
* **Displays the Text:** Displays the summary in large high-contrast text.
* **Modern & Accessible UI:** A clean, high-contrast interface with large buttons, designed specifically for elderly users.

<img width="829" height="161" alt="image" src="https://github.com/user-attachments/assets/087f9770-b7a8-4dc6-b284-568989e0620b" />

## Tech Stack

* **Backend:** Python, Flask, Gunicorn
* **Frontend:** HTML5, CSS3, JavaScript
* **AI Services:** Google Cloud Vision API, Google Gemini API
* **Deployment:**
    * Backend deployed on **Render**
    * Frontend deployed on **Vercel**

## How to Run?

### Step 1: Backend Setup

1.  **Clone the repo:**

    ```bash
    git clone https://github.com/sumukhacharya03/Senior-Vision-AI.git
    cd Senior-Vision-AI/backend
    ```

2.  **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up credentials:**

    * Create a `.env` file inside the `backend` folder and add your Gemini API key:
      
      ```
      GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
      ```
      
    * Place your Google Cloud credentials JSON file in the `backend` folder.

5.  **Run the backend server:**

    * Set the environment variable for your credentials file.
      
      ```bash
      $env:GOOGLE_APPLICATION_CREDENTIALS = "your-credentials-file-name.json"
      ```
      
    * Start the server. It will listen on all network interfaces, making it accessible from your phone.
    
        ```bash
        flask run --host=0.0.0.0
        ```
      
    **Keep this terminal running.**

### Step 2: Frontend Setup

1.  **Open the `frontend` folder in VS Code:**

    * In VS Code, go to **File > Open Folder...** and select the `frontend` directory specifically.

2.  **Update the Backend URL:**

    * Open `frontend/app.js`.
    * Find your computer's local network IP address (e.g., `192.168.1.10`).
    * Update the `BACKEND_URL` constant to point to your running backend server:
      
      ```javascript
      const BACKEND_URL = 'http://192.168.1.10:5000/api/scan';
      ```

3.  **Run the frontend server:**
   
    * Right-click the `index.html` file in the VS Code explorer and select **"Open with Live Server"**.
    * Your browser will open the application. You can now test it on your computer or access it from your phone using the network URL provided by Live Server.

