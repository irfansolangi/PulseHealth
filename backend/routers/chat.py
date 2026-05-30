from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import psycopg2
from services.rag import get_relevant_content, generate_response

router = APIRouter()

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    query = payload.query
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        # Step 1: Retrieve relevant contents from Qdrant Cloud
        context = get_relevant_content(query)

        # Step 2: Generate response using OpenAI Chat API
        assistant_reply = generate_response(query, context)

        # Step 3: Save session history entry to Neon Serverless Postgres
        save_chat_history(query, assistant_reply)

        # Step 4: Return response
        return ChatResponse(response=assistant_reply)

    except Exception as e:
        print(f"Error handling chat route: {e}")
        # Return fallback response or raise HTTP error
        return ChatResponse(
            response=f"I'm operating in diagnostics fallback mode. Here is what you asked: '{query}'. "
                     "To unlock full AI capabilities, make sure to add your OPENAI_API_KEY, "
                     "QDRANT_URL, and DATABASE_URL variables to your environment."
        )

def save_chat_history(query: str, reply: str):
    """
    Saves user inquiries and assistant logs to Neon Serverless Postgres.
    Attempts connection and logs failure if database credentials are not yet configured.
    """
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not set. Skipping chat history database logging.")
        return

    conn = None
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # Ensure schema table exists
        cur.execute("""
            CREATE TABLE IF NOT EXISTS chat_logs (
                id SERIAL PRIMARY KEY,
                query TEXT NOT NULL,
                response TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # Insert log
        cur.execute(
            "INSERT INTO chat_logs (query, response) VALUES (%s, %s);",
            (query, reply)
        )
        
        conn.commit()
        cur.close()
        print("Chat log successfully saved to Neon Postgres.")
    except Exception as e:
        print(f"Failed to log chat history to Neon Postgres database: {e}")
    finally:
        if conn:
            conn.close()
