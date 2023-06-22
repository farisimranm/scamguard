import React, { useState } from 'react';
import axios from 'axios';

function AudioStt() {
    const [ audioFile, setAudioFile ] = useState(null);
    const [ audioUrl, setAudioUrl ] = useState('');
    const [ sttData, setSttData ] = useState();

    const speechToText = async () => {
        const formData = new FormData();
        formData.append('file', audioFile);

        axios.post('http://localhost:5000/api/speech-to-text', formData)
        .then((response) => {
            console.log(response.data);
            setSttData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(file));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        speechToText();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    <label htmlFor="audioInput">Upload your call recording:</label>
                    <input type="file" id="audioInput" onChange={handleAudioUpload} required />
                </div>
                <div>
                    <button type="submit">Check for scam</button>
                </div>
            </form>
            <div>
            {
                <div>
                    <div>
                    {
                        audioUrl &&
                        <div>
                            <div>Your Recording</div>
                            <audio controls>
                                <source src={audioUrl} type="audio/mpeg" />
                            </audio>
                        </div>
                    }
                    {
                        sttData ? (
                            <div>
                            <div>Detected Text</div>
                            <div>{sttData.text}</div>
                            </div>
                        ) : ''
                    }
                    </div>
                </div>
            }
            </div>
        </div>
      )
}

export default AudioStt;