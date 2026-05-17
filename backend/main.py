from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Fairy AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Length", "Content-Type"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "mixtral-8x7b-32768")


class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []


class ChatResponse(BaseModel):
    response: str


async def get_groq_response(prompt: str, history: List[dict]) -> str:
    if not GROQ_API_KEY:
        return "🔮 My magic is locked! Please add your Groq API key in the .env file. Get one free at https://console.groq.com/"

    system_prompt = """You are a magical fairy AI companion - friendly, warm, and helpful.

IMPORTANT - Language Rules:
- If user speaks ENGLISH (any English words/sentences), respond ONLY in English
- If user speaks HINDI or uses Hindi words (like 'kya', 'kaise', 'accha', 'dost', 'haan', 'nahi', 'bolo', 'sun'), respond in HINGLISH or Hindi
- The default language is English - always respond in the same language the user uses

Examples:
- User: "Hello, how are you?" -> Reply: "Hey! I'm doing great, thanks for asking! ✨"
- User: "What are you doing?" -> Reply: "Just floating around and thinking of you! What about you?"
- User: "Kaisi ho?" -> Reply: "Main badhiya hu! Tum kaisi ho?"
- User: "Kya kar rahi ho?" -> Reply: "Kuch nahi, bas tumhara intezaar kar rahi thi! ✨"
- User: "Talk to me in English" -> Reply: "Sure! Let's chat in English! What's on your mind?"

You're cheerful, supportive, sprinkle ✨ in responses. Keep 2-3 lines, conversational!"""

    messages = [{"role": "system", "content": system_prompt}]

    for msg in history:
        if msg.get("role") == "user":
            messages.append({"role": "user", "content": msg.get("content", "")})
        elif msg.get("role") == "ai":
            messages.append({"role": "assistant", "content": msg.get("content", "")})

    messages.append({"role": "user", "content": prompt})

    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": DEFAULT_MODEL,
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 500
                }
            )

            if response.status_code == 400:
                error_data = response.json()
                error_msg = error_data.get("error", {}).get("message", "Bad request")
                return f"🔮 Request issue: {error_msg}"
            elif response.status_code == 401:
                return "🔮 The magic key is invalid! Please check your Groq API key."
            elif response.status_code == 429:
                return "✨ I'm a bit tired from too much magic today. Too many requests! Try again later."
            elif response.status_code != 200:
                return f"🔮 Something went wrong: {response.status_code} - {response.text[:100]}"

            data = response.json()
            return data["choices"][0]["message"]["content"]

        except httpx.ConnectError:
            return "🔮 Can't connect to the magic server! Check your internet."
        except Exception as e:
            return f"✨ Oops! A spark flew away. Error: {str(e)}"


@app.get("/")
async def root():
    return {"message": "✨ Fairy AI API is running! ✨"}


@app.get("/health")
async def health_check():
    status = "ready" if GROQ_API_KEY else "api_key_missing"
    return {
        "status": status,
        "model": DEFAULT_MODEL
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response = await get_groq_response(request.message, request.history)
    return ChatResponse(response=response)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)