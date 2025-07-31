import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import vision
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY not found. Please set it in the .env file.")
genai.configure(api_key=gemini_api_key)

PROMPT = """
You are a helpful grocery assistant for an elderly person with vision difficulties.
Your task is to provide a very simple, clear, and friendly one-sentence summary of a product based on the text extracted from its packaging.

Focus on the most important information:
- What is the product?
- Are there any critical warnings (e.g., "contains nuts", "high sodium")?
- Is there a key benefit (e.g., "sugar-free", "gluten-free", "organic")?

RULES:
- Keep the summary to a single, easy-to-read sentence.
- Do not use jargon.
- Be friendly and reassuring.

Here is the text from the package:
---
{product_text}
---

Your friendly one-sentence summary:
"""

@app.route('/api/scan', methods=['POST'])
def scan_product():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        content = file.read()
        client = vision.ImageAnnotatorClient()
        image = vision.Image(content=content)
        response = client.text_detection(image=image)
        texts = response.text_annotations

        if texts:
            extracted_text = texts[0].description
        else:
            return jsonify({"summary": "I couldn't read any text on this item. Please try again with a clearer picture."}), 200

        if response.error.message:
            raise Exception(f"Vision API Error: {response.error.message}")

    except Exception as e:
        return jsonify({"error": f"Failed to process image with OCR: {str(e)}"}), 500

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        formatted_prompt = PROMPT.format(product_text=extracted_text)
        summary_response = model.generate_content(formatted_prompt)
        summary = summary_response.text.strip()

    except Exception as e:
        return jsonify({"error": f"Failed to get summary from AI model: {str(e)}"}), 500

    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)