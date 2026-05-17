# Fairy AI - Voice Chat Companion

## Project Overview

- **Project Name**: Fairy AI
- **Type**: Voice-based AI Companion Web App
- **Core Functionality**: A magical fairy AI that listens to your voice questions and responds conversationally with voice output
- **Target Users**: Anyone seeking a friendly AI companion
- **Cost**: 100% Free (local AI using Ollama)

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│              (Vite + Tailwind CSS)                       │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP / WebSocket
┌────────────────────────▼────────────────────────────────┐
│                  Python FastAPI Backend                 │
│                  (Port: 8000)                           │
└────────────────────────┬────────────────────────────────┘
                         │ Python API
┌────────────────────────▼────────────────────────────────┐
│                    Ollama (Local AI)                     │
│               (Port: 11434) - FREE                      │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Vite | UI Framework |
| Styling | Tailwind CSS | Styling |
| Backend | Python FastAPI | API Server |
| AI Engine | Ollama | Local LLM (free) |
| Voice In | Web Speech API | Speech-to-Text |
| Voice Out | Web Speech API / Edge-TTS | Text-to-Speech |

## Features

### 1. Voice Input
- Click microphone button to start recording
- Use Web Speech API for speech recognition
- Real-time transcription display
- Automatic stop on silence

### 2. AI Chat
- Send transcribed text to FastAPI backend
- Backend calls Ollama for AI response
- Streaming response support
- Conversational context retention

### 3. Voice Output
- Convert AI response to speech
- Use browser's SpeechSynthesis API
- Select different voices
- Adjustable speech rate

### 4. Fairy UI
- Animated fairy character/avatar
- Magical theme with glows and particles
- Chat message bubbles
- Visual feedback for listening/speaking

## File Structure

```
fairy-ai/
├── frontend/           # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── FairyAvatar.jsx
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── VoiceButton.jsx
│   │   │   └── ChatInterface.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/            # Python FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── .env
└── README.md
```

## API Endpoints

### POST /api/chat
Send a message and get AI response.

**Request:**
```json
{
  "message": "Hello fairy!",
  "history": []
}
```

**Response:**
```json
{
  "response": "Hello! I'm your magical fairy companion..."
}
```

### GET /api/models
List available Ollama models.

## Acceptance Criteria

1. ✅ User can click mic button and speak
2. ✅ Speech is transcribed to text in real-time
3. ✅ Text is sent to backend and AI responds
4. ✅ AI response is spoken aloud via TTS
5. ✅ Fairy UI shows animated avatar
6. ✅ Chat history is displayed
7. ✅ Everything runs locally for FREE