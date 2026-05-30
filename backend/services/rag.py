import os
from openai import OpenAI
from qdrant_client import QdrantClient

def get_qdrant_client():
    """
    Initializes Qdrant Client. Returns None if QDRANT_URL or QDRANT_API_KEY are missing.
    """
    url = os.getenv("QDRANT_URL")
    api_key = os.getenv("QDRANT_API_KEY")
    if not url or not api_key:
        return None
    try:
        return QdrantClient(url=url, api_key=api_key)
    except Exception as e:
        print(f"Failed to connect to Qdrant Cloud client: {e}")
        return None

def get_openai_client():
    """
    Initializes OpenAI Client. Returns None if OPENAI_API_KEY is missing.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    try:
        return OpenAI(api_key=api_key)
    except Exception as e:
        print(f"Failed to connect to OpenAI client: {e}")
        return None

def get_relevant_content(query: str) -> str:
    """
    Retrieves matching contents from Qdrant Cloud using text embeddings.
    If Qdrant is unconfigured, performs matching based on our wellness database documents.
    """
    client = get_qdrant_client()
    openai_client = get_openai_client()

    if client and openai_client:
        try:
            # 1. Generate Query Embeddings
            model = "text-embedding-3-small"
            embed_response = openai_client.embeddings.create(
                input=[query],
                model=model
            )
            query_vector = embed_response.data[0].embedding

            # 2. Query Qdrant
            collection_name = os.getenv("QDRANT_COLLECTION", "pulse_wellness")
            search_results = client.search(
                collection_name=collection_name,
                query_vector=query_vector,
                limit=3
            )

            # Combine matches
            matches = []
            for hit in search_results:
                payload = hit.payload
                matches.append(f"Title: {payload.get('title')}\nContent: {payload.get('content')}")
            
            return "\n\n".join(matches)
        except Exception as e:
            print(f"Qdrant vector matching failed: {e}. Falling back to keyword match.")

    # Local Knowledge base matching fallback (RAG simulator)
    q = query.lower()
    if "sleep" in q or "circadian" in q or "night" in q or "bedtime" in q:
        return (
            "Title: Mastering circadian rhythms\n"
            "Key facts: Keep room cool at 65°F/18°C. Avoid blue digital light 90 mins before bed. "
            "Expose eyes to bright sun early in the morning to cease melatonin and raise cortisol."
        )
    elif "food" in q or "nutri" in q or "eat" in q or "brain" in q or "omega" in q:
        return (
            "Title: Fueling cognitive performance\n"
            "Key facts: Brain consumes 20% of energy. Fatty acids in fish build neural membranes. "
            "Antioxidants in blueberries slow cognitive aging. Drink 2.5L water to avoid performance brain fog."
        )
    elif "zone" in q or "fitness" in q or "cardio" in q or "exercise" in q:
        return (
            "Title: Zone 2 Training base building\n"
            "Key facts: Run or walk at 60-70% of max heart rate (180 minus age). "
            "Maximizes mitochondrial size and fat oxidation. Maintain a light conversational pace."
        )
    return "Title: General Health Tips\nKey facts: Keep consistent sleep schedules, stay hydrated, and perform daily physical activities."

def generate_response(query: str, context: str) -> str:
    """
    Generates dynamic prompt response using OpenAI completions.
    If OpenAI is unconfigured, constructs an intelligent local mock response format.
    """
    openai_client = get_openai_client()
    
    if openai_client:
        try:
            system_prompt = (
                "You are PulseAI, a highly intelligent clinical healthcare and sports physiology assistant.\n"
                "Provide helpful, concise, and friendly answers utilizing the verified scientific facts from our database.\n"
                "Remember to include a brief friendly header or checklist where relevant.\n"
                "Always add a medical disclaimer at the bottom of your response stating: "
                "'Disclaimer: Always consult with a physician regarding diagnostic values.'"
            )
            
            user_prompt = f"Context from database:\n{context}\n\nUser Question:\n{query}"
            
            chat_completion = openai_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                model="gpt-4o-mini",
                temperature=0.7,
                max_tokens=350
            )
            
            return chat_completion.choices[0].message.content
        except Exception as e:
            print(f"OpenAI completions failed: {e}. Falling back to smart templates.")

    # Intelligent Local Mock Output Generator (RAG template response)
    q = query.lower()
    
    header = "Hello! I am PulseAI. Since our live OpenAI Cloud keys are not configured in your current local environment, I am providing a response from our local knowledge base:\n\n"
    disclaimer = "\n\nDisclaimer: Always consult with a physician regarding diagnostic values."

    if "sleep" in q or "circadian" in q or "night" in q or "bedtime" in q:
        return header + (
            "According to our Circadian Rhythm guide, perfect sleep is built upon two pillars:\n"
            "1. Sleep pressure: Maintained by waking at the same time each day.\n"
            "2. Environmental triggers: Light and temperature. View sunlight early in the morning and avoid screens late at night. Cool room temperatures signal the nervous system to prepare for deep sleep states."
        ) + disclaimer
    elif "food" in q or "nutri" in q or "eat" in q or "brain" in q or "omega" in q:
        return header + (
            "Your brain is highly metabolic and demands quality fuel:\n"
            "• Blueberries/Blackberries: Slow down cognitive aging.\n"
            "• Fatty Fish (Salmon/Sardines): Provide Omega-3s essential for cellular membranes.\n"
            "• Water: Drink 2.5L+ to keep your brain hydrated and clear of toxic build-ups."
        ) + disclaimer
    elif "zone" in q or "fitness" in q or "cardio" in q or "exercise" in q:
        return header + (
            "Zone 2 exercise builds your mitochondrial base:\n"
            "• Intensity: 60-70% of max heart rate (estimated by 180 minus age).\n"
            "• Target: Aim for 150 minutes per week. You should be able to speak but not sing during workouts."
        ) + disclaimer
    elif "bmi" in q or "calc" in q or "weight" in q or "height" in q:
        return header + (
            "Please open our 'Calculators' page to evaluate your BMI and Heart Rate zones. Body Mass Index categories are:\n"
            "• < 18.5: Underweight\n"
            "• 18.5 - 24.9: Normal Range\n"
            "• 25.0 - 29.9: Overweight\n"
            "• >= 30.0: Obese"
        ) + disclaimer
    
    return header + (
        "I am here to answer inquiries about sleep cycles, brain fuel nutrition, Zone 2 physical fitness, and metrics tools. "
        "Feel free to ask a specific topic!"
    ) + disclaimer
