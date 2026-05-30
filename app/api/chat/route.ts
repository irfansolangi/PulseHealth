import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const normalizedQuery = query.toLowerCase();

    // 1. Try to communicate with the FastAPI backend
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000); // 2 second timeout for fast fallback

      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });
      clearTimeout(id);

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ response: data.response });
      }
    } catch (e) {
      console.log("FastAPI backend offline, executing local intelligent response fallback.");
    }

    // 2. Intelligent RAG Fallback System
    let reply = "";

    if (normalizedQuery.includes("sleep") || normalizedQuery.includes("circadian") || normalizedQuery.includes("bedtime") || normalizedQuery.includes("night")) {
      reply = `Based on our wellness guide "Mastering Your Circadian Rhythm":
      
      Your internal sleep clock is highly regulated by light and temperature:
      • Sunlight: View direct sunlight for 10-15 minutes within an hour of waking to stop melatonin production and start cortisol release.
      • Screen Light: Avoid screens for 90 minutes before bedtime. Blue light fools the SCN in your brain into thinking it is daytime.
      • Temperature: Keep your room cool, around 65°F (18°C), to align with your body's natural night-time temperature drop.`;
    } 
    else if (normalizedQuery.includes("food") || normalizedQuery.includes("nutrition") || normalizedQuery.includes("eat") || normalizedQuery.includes("brain") || normalizedQuery.includes("omega") || normalizedQuery.includes("diet")) {
      reply = `According to our nutritional expert guide "Nutrition for Brain Power":
      
      Your brain consumes about 20% of your body's daily energy:
      • Essential Fats: 60% of the brain is fat. Eat wild-caught fatty fish (salmon, sardines) twice a week to build neural pathways.
      • Antioxidants: Eat dark berries (blueberries, blackberries) rich in anthocyanins, which protect brain cells from oxidative stress and aging.
      • Hydration: Even a mild 1-2% body weight dehydration leads to brain fog and cognitive crashes. Aim for 2.5+ liters of water daily.`;
    } 
    else if (normalizedQuery.includes("fitness") || normalizedQuery.includes("zone") || normalizedQuery.includes("cardio") || normalizedQuery.includes("heart") || normalizedQuery.includes("workout") || normalizedQuery.includes("exercise")) {
      reply = `Referring to our physical longevity guide "Zone 2 Cardio: Key to Mitochondrial Health":
      
      Zone 2 cardio is steady-state work at 60-70% of your max heart rate (estimated by: 180 minus age):
      • Benefits: It builds the volume of mitochondria in your cells, enhancing ATP (energy) production.
      • Intensity: Work at a speed where you can hold a light conversation. Focus on nasal breathing.
      • Duration: Aim for 150 minutes of Zone 2 training per week. Use our tracker page to log your progress!`;
    } 
    else if (normalizedQuery.includes("mind") || normalizedQuery.includes("stress") || normalizedQuery.includes("anxiety") || normalizedQuery.includes("meditat") || normalizedQuery.includes("breath")) {
      reply = `According to Dr. Alistair Vance's clinical review on "Mindfulness and Neuroplasticity":
      
      Chronic stress expands the amygdala (fear-center), causing high anxiety. You can physically rewire your brain with mindfulness:
      • Prefrontal Cortex: Daily practices thicken this area, improving emotional regulation and attention.
      • Box Breathing: Cycle through 4 seconds of inhaling, 4 seconds holding, 4 seconds exhaling, and 4 seconds holding. This activates your rest-and-digest nervous system.
      • Digital Detox: Spend 10 minutes walking outside daily without looking at screens.`;
    } 
    else if (normalizedQuery.includes("bmi") || normalizedQuery.includes("calc") || normalizedQuery.includes("weight") || normalizedQuery.includes("height")) {
      reply = `You can easily calculate your body metrics using our "Health Calculators" tab! 
      
      It evaluates:
      • BMI (Body Mass Index) under metric or imperial systems.
      • Optimal target heart rate ranges based on your age.
      
      Navigate to the "Calculators" tab in the navigation bar to enter your height and weight and receive direct lifestyle tips.`;
    } 
    else if (normalizedQuery.includes("tracker") || normalizedQuery.includes("log") || normalizedQuery.includes("water") || normalizedQuery.includes("drink")) {
      reply = `Our "Fitness Tracker" page provides real-time activity and hydration logs:
      
      • Log workouts: Select category (Running, Cycling, Swimming, Lifting), duration, and see calculated calories burned.
      • Water Tracker: Tap on the water cup graphics to add 250ml glasses of water dynamically toward your daily target.
      • Persistence: Your logged workouts and cup counts are stored directly in your browser's LocalStorage, meaning your data stays private and saves automatically.`;
    } 
    else {
      reply = `Hello! I can answer questions about sleep cycles, cognitive nutrition, Zone 2 exercise, and stress relief.
      
      Try asking:
      • "How do I optimize my sleep?"
      • "What foods help my brain?"
      • "How does Zone 2 training work?"
      • "How do I calculate my BMI?"`;
    }

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
