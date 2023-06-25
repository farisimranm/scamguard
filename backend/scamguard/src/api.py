from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from pydub import AudioSegment
import tempfile
import requests

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

def speechFraudDetection(text):
    url = 'http://localhost:8081/api/v1/speech-fraud-detection'

    request_body = {
        'chatMessages': [
            {
                'role': 'user',
                'content': f'I have converted a suspicious phone call I received into text. There might be some mistakes or missing words, but can you help me analyze if the caller is trying to scam me? This is the call transciption: {text}'
            }
        ]
    }

    print(f'Sending results to Java Spring Boot API...')
    response = requests.post(url, json=request_body).json()
    return response

@app.route('/api/v1/speech-fraud-detection', methods=['POST'])
def speech_to_text():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found in the request.'}), 400
    
    file = request.files['file']
    filename = file.filename
    print(f'Received {filename}')
    
    try:
        # convert audio file to flac to feed into SpeechRecognition
        print(f'Processing {filename}...')
        audio = AudioSegment.from_file(file)
        temp_file = tempfile.NamedTemporaryFile(suffix=".flac", delete=False)
        audio.export(temp_file.name, format="flac")
        temp_file_path = temp_file.name
        
        # Perform speech-to-text processing using the SpeechRecognition library
        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_file_path) as source:
            audio_data = recognizer.record(source)
        
        print(f'Running speech recognition...')
        text = recognizer.recognize_google(audio_data)
        response = speechFraudDetection(text)
        return jsonify(response), 200

    except sr.UnknownValueError:
        return jsonify({'error': 'Speech recognition could not understand the audio.'}), 500

    except sr.RequestError:
        return jsonify({'error': 'Error occurred while processing the audio.'}), 500
    
    except Exception as e:
        return jsonify({'error': 'Error occurred while processing the audio: ' + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
