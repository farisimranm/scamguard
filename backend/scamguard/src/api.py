from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from pydub import AudioSegment
from os.path import splitext

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

def mp3_to_flac(mp3_path):
    flac_path = "%s.flac" % splitext(mp3_path)[0]
    song = AudioSegment.from_file(mp3_path)
    song.export(flac_path, format = "flac")
    return flac_path

# TODO - ADD SUPPORT FOR OTHER AUDIO FORMATS
@app.route('/api/speech-to-text', methods=['POST'])
def speech_to_text():
    if 'file' not in request.files:
        return 'No file found in the request.'
    
    file = request.files['file']
    file_name = file.filename
    file.save(file_name)

    # convert mp3 to flac to feed into SpeechRecognition
    flac_path = mp3_to_flac(file_name)

    # Perform speech-to-text processing using the SpeechRecognition library
    recognizer = sr.Recognizer()
    with sr.AudioFile(flac_path) as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data)
        return jsonify({'text': text}), 200

    except sr.UnknownValueError:
        return jsonify({'error': 'Speech recognition could not understand the audio.'}), 500

    except sr.RequestError:
        return jsonify({'error': 'Error occurred while processing the audio.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
