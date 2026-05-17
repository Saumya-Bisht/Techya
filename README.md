# Fairy AI - Your Magical Voice Companion

A free, voice-based AI companion web app built with React, Python FastAPI, and Groq (free AI).

## Setup (Local)

### 1. Get Free Groq API Key
1. Go to https://console.groq.com/
2. Click "Create API Key" (free, no credit card)
3. Copy the key

### 2. Configure Backend
```bash
cd backend
cp .env.example .env
# Edit .env and paste your API key
```

### 3. Install & Run
```bash
# Backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### 4. Open Browser
http://localhost:5173

## Deploy to Production (Free)

### Option 1: Render (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Fairy AI"
# Create repo on GitHub and push
```

2. **Deploy Backend**
- Go to https://render.com
- Connect GitHub, select your repo
- Create New > Web Service
- Build Command: `pip install -r requirements.txt`
- Start Command: `python main.py`
- Add Environment Variable: `GROQ_API_KEY` = your key

3. **Deploy Frontend**
- Go to https://vercel.com
- Import your GitHub repo
- Build command: `npm run build`
- Output directory: `dist`
- Add env var: `VITE_API_URL` = your backend URL

### Option 2: Fly.io

```bash
fly launch
fly secrets set GROQ_API_KEY=your_key
fly deploy
```

## Features

- 🎤 Voice input (Speech-to-Text)
- 🔮 Voice output (Text-to-Speech)
- ✨ Magical fairy UI with animations
- 💬 Chat history
- 🌍 Deployable anywhere (free with Groq)

## Tech Stack

- **Frontend**: React + Vite + Tailwind
- **Backend**: Python FastAPI
- **AI**: Groq (free tier: 500 requests/day)
- **Voice**: Web Speech API

## Free Tier Limits

**Groq Free:**
- 500 requests/day
- 500k tokens/day
- Plenty for personal use!

## Troubleshooting

### API key not working?
- Make sure you added it in the .env file
- Check https://console.groq.com/usage for your key

### Voice not working?
- Use Chrome browser
- Allow microphone permissions

## Future Plans

- [ ] Convert to React Native for mobile
- [ ] Add more fairy characters
- [ ] Voice customization
- [ ] Remember conversation context# Techya
Your Tech Fairy Companion
