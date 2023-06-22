# ScamGuard Chatbot App

This project is a chatbot developed for the AML Hackathon 2023.
The purpose of the chatbot is to help users identify fraud, scams, and phishing attempts.
The chatbot provides a user-friendly interface for interacting with the fraud detection system.

## Features

- Extract text from screenshot of suspicious chat
- Extract text from recording of suspicious call
- Identify potential fraud, scams, and phishing attempts based on the input
- Provide information and tips to users for staying safe online
- Interactive chat interface for a seamless user experience

## Technologies Used

- Frontend: Create React App
- Backend: Python Flask

## Installation

### Prerequisites

- Node.js
- Python

### Frontend Setup

1. Navigate to the root folder of the app:
`cd frontend/scamguard`

2. Install dependencies:
`yarn install` or `npm install`

3. Start the app:
`yarn start` or `npm start`

### Backend Setup

1. Navigate to the root folder of the app:
`cd backend/scamguard`

2. Activate the virtual environment (recommended):
`scamguard-venv/Scripts/activate`

3. Install the required Python packages:
`pip install -r requirements.txt`

4. Run api.py:
`python src/api.py`
