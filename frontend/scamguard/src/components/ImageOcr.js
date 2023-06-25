import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

function ImageOcr() {
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ ocrData, setOcrData ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ progress, setProgress] = useState(0);

  const ocr = async () => {
    const worker = await createWorker({
      logger: m => {
        console.log("[OCR] '" + selectedImage.name + "' : ", m["progress"] * 100 + "%");
        setProgress(m["progress"]);
      }
    });
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(selectedImage);
    setOcrData(data);
    console.log(data.text);
    await worker.terminate();
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    ocr();
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="imageInput">Upload your screenshot image:</label>
                <input type="file" id="imageInput" onChange={handleImageUpload} required />
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
                    imageUrl &&
                    <div>
                        <div>Your Image</div>
                        <img src={imageUrl} height='500px' alt="Uploaded" />
                    </div>
                }
                {
                    progress > 0 && progress < 1 ? (
                    <div>
                        {`Reading text: ${Math.round(progress * 100)}%`}
                    </div>
                    ) : (
                    <div></div>
                    )
                }
                </div>
            </div>
            }
            {
              ocrData ? (
                  <div>
                  <div>Detected Text</div>
                  <div>{ocrData.text}</div>
                  </div>
              ) : ''
            }
        </div>
    </div>
  )
}

export default ImageOcr;