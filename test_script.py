import os
import requests
import random

DATA_FOLDER = 'data'
BACKEND_URL = 'http://127.0.0.1:5000/api/scan'

def test_random_image():
    try:
        image_files = [f for f in os.listdir(DATA_FOLDER) if f.endswith(('.jpg', '.jpeg', '.png'))]
        if not image_files:
            print(f"Error: No images found in the '{DATA_FOLDER}' folder.")
            return

        random_image_name = random.choice(image_files)
        image_path = os.path.join(DATA_FOLDER, random_image_name)

        print(f"Testing with image: {random_image_name}")

        with open(image_path, 'rb') as f:
            files = {'image': (random_image_name, f, 'image/jpeg')}
            response = requests.post(BACKEND_URL, files=files, timeout=30)

        if response.status_code == 200:
            summary = response.json().get('summary')
            print(f"Summary: \"{summary}\"")
        else:
            print(f"Error: {response.status_code} - {response.text}")

    except requests.exceptions.RequestException:
        print(f"Connection Error: Could not connect to the backend at {BACKEND_URL}. Is the Flask server running?")
    except FileNotFoundError:
        print(f"Error: The '{DATA_FOLDER}' directory was not found.")

if __name__ == '__main__':
    test_random_image()