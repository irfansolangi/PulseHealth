import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers.chat import router as chat_router

# Load env variables
load_dotenv()

app = FastAPI(
    title="PulseHealth AI Chatbot API",
    description="Vector Search RAG Chatbot Service leveraging Qdrant Cloud, OpenAI, and Neon Postgres.",
    version="1.0.0"
)

# Enable CORS for Next.js app queries
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="", tags=["Chat"])

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "PulseHealth Chatbot API",
        "features": ["Qdrant Vector Search", "OpenAI Chat Completions", "Neon Chat History Logging"]
    }

if __name__ == "__main__":
    import uvicorn
    # Read port from env or default to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
