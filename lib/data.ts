export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Nutrition" | "Mental Health" | "Fitness" | "Sleep";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  checklist: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mastering-circadian-rhythm",
    title: "Mastering Your Circadian Rhythm: The Science of Perfect Sleep",
    excerpt: "Discover how aligning your daily habits with your body's natural clock can dramatically improve your energy, focus, and recovery.",
    category: "Sleep",
    readTime: "6 min read",
    date: "May 28, 2026",
    author: {
      name: "Dr. Sarah Chen",
      role: "Sleep Medicine Specialist",
      avatar: "/images/avatars/sarah-chen.jpg"
    },
    image: "https://images.unsplash.com/photo-1511295742364-92767edb68b1?auto=format&fit=crop&w=800&q=80",
    checklist: [
      "View direct natural sunlight for 10-15 minutes within an hour of waking.",
      "Maintain a consistent wake-up time, even on weekends.",
      "Limit caffeine intake to before 12:00 PM.",
      "Avoid bright screen lights for 90 minutes before bedtime.",
      "Keep your bedroom temperature cool, around 65°F (18°C)."
    ],
    content: `
      Your circadian rhythm is a 24-hour internal clock that runs in the background of your brain, cycling between sleepiness and alertness at regular intervals. It's also known as your sleep-wake cycle.
      
      When your circadian rhythm is properly aligned, you fall asleep easily, sleep deeply through the night, and wake up feeling refreshed. However, modern lifestyle factors like artificial blue light, irregular work shifts, and high stress levels can easily knock this clock out of alignment.
      
      ### 1. The Role of Light
      Light is the primary cue that sets your internal clock. When sunlight hits your eyes in the morning, it triggers your brain's suprachiasmatic nucleus (SCN) to stop producing melatonin (the sleep hormone) and start producing cortisol to wake you up.
      
      ### 2. Digital Curfews
      The blue light emitted from smartphones, laptops, and tablets mimics daylight. Viewing these screens late at night fools the brain into thinking it is still daytime, delaying the release of melatonin by up to two hours.
      
      ### 3. Temperature Cycles
      Your body temperature naturally drops in the evening to prepare for sleep. Keeping your room cool assists this process, signaling to your body that it is time to wind down.
    `
  },
  {
    slug: "fueling-for-cognitive-performance",
    title: "Fueling for Cognitive Performance: Nutrition for Brain Power",
    excerpt: "What you eat directly impacts your brain's processing speed, memory, and emotional balance. Learn which foods optimize daily mental performance.",
    category: "Nutrition",
    readTime: "5 min read",
    date: "May 24, 2026",
    author: {
      name: "Marcus Vance",
      role: "Sports & Cognitive Nutritionist",
      avatar: "/images/avatars/marcus-vance.jpg"
    },
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    checklist: [
      "Add a handful of blueberries or blackberries to your breakfast.",
      "Eat wild-caught fatty fish (salmon, sardines) twice a week.",
      "Swap refined sugar snacks for raw pumpkin seeds or walnuts.",
      "Drink at least 2.5 liters of water daily to prevent brain fog.",
      "Incorporate leafy green vegetables into at least one meal a day."
    ],
    content: `
      Your brain is an energy-intensive organ, consuming about 20% of your body's daily calories. The quality of fuel you feed it directly influences how you think, focus, and feel.
      
      Choosing whole, nutrient-dense foods over processed sugars helps maintain stable glucose levels, preventing energy crashes that lead to brain fog and irritability.
      
      ### 1. Essential Omega-3 Fatty Acids
      About 60% of your brain is made of fat, and half of that fat is the omega-3 kind. Your brain uses omega-3s to build brain and nerve cells, which are crucial for learning and memory.
      
      ### 2. The Power of Antioxidants
      Blueberries contain anthocyanins, compounds with anti-inflammatory and antioxidant effects. Antioxidants act against both oxidative stress and inflammation, conditions that can contribute to brain aging and neurodegenerative diseases.
      
      ### 3. Hydration and Brain Volume
      Even mild dehydration (1-2% loss of body weight) can impair cognitive performance, reduce working memory, and increase anxiety levels. Keeping hydrated keeps your neural networks firing smoothly.
    `
  },
  {
    slug: "zone-2-training-longevity",
    title: "Zone 2 Cardio: The Golden Key to Mitochondrial Health",
    excerpt: "Explore why low-intensity, steady-state exercise is the absolute foundation for metabolic health, fat oxidation, and physical longevity.",
    category: "Fitness",
    readTime: "8 min read",
    date: "May 19, 2026",
    author: {
      name: "Coach Jenna Reynolds",
      role: "Exercise Physiologist",
      avatar: "/images/avatars/jenna-reynolds.jpg"
    },
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    checklist: [
      "Determine your target Zone 2 heart rate range (approx. 180 minus age).",
      "Aim for 150 minutes of Zone 2 cardio per week.",
      "Ensure you can maintain a light conversation during the workout.",
      "Focus on nasal breathing to control exertion levels.",
      "Log your session duration and heart rate consistency."
    ],
    content: `
      Zone 2 training refers to a level of cardiovascular effort where you are exercising at 60-70% of your maximum heart rate. At this intensity, your body primarily uses fats, rather than carbohydrates, as a fuel source through aerobic metabolism.
      
      Building a strong Zone 2 base strengthens your mitochondria—the cellular powerhouses that produce energy—making your body highly metabolic and resilient.
      
      ### 1. Mitochondrial Efficiency
      In Zone 2, your cells maximize the size and number of mitochondria. This allows you to produce more ATP (energy) per breath of oxygen, resulting in sustained stamina throughout your day.
      
      ### 2. Fat Adaptation
      Consistent steady-state training trains your skeletal muscles to burn fat more efficiently. This metabolic flexibility means you can sustain physical effort longer without needing to constantly replenish sugar stores.
      
      ### 3. Active Recovery
      Because Zone 2 training does not accumulate high amounts of lactate or place stress on the central nervous system, it stimulates blood flow and speeds up recovery from higher-intensity lifting or sprinting.
    `
  },
  {
    slug: "neuroplasticity-and-mindfulness",
    title: "Mindfulness and Neuroplasticity: Rewiring the Stressed Brain",
    excerpt: "Science shows that simple daily mindfulness practices can literally alter the structure of your brain, reducing anxiety and boosting emotional control.",
    category: "Mental Health",
    readTime: "5 min read",
    date: "May 15, 2026",
    author: {
      name: "Dr. Alistair Vance",
      role: "Clinical Psychologist & Researcher",
      avatar: "/images/avatars/alistair-vance.jpg"
    },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    checklist: [
      "Practice 5 minutes of box breathing (4s inhale, 4s hold, 4s exhale, 4s hold).",
      "Do a silent body scan meditation before starting your work day.",
      "Take a 10-minute walk outside without looking at your phone.",
      "Keep a daily journal writing down 3 specific things you are grateful for.",
      "Notice your breath when transition states occur (e.g. starting your car)."
    ],
    content: `
      For decades, scientists believed the adult brain was fixed. We now know the brain is highly adaptable—a characteristic known as neuroplasticity. The thoughts you think and habits you practice shape the physical structure of your brain.
      
      Under chronic stress, the amygdala (the brain's threat-detection center) grows larger and more reactive, leading to heightened anxiety. Daily mindfulness practices have been shown to reverse this effect.
      
      ### 1. Shrinking the Amygdala
      Brain scans show that 8 weeks of consistent mindfulness practice can significantly decrease the grey-matter volume in the amygdala, reducing the frequency of the 'fight or flight' response.
      
      ### 2. Strengthening the Prefrontal Cortex
      The prefrontal cortex regulates decision-making, attention, and emotional control. Mindfulness practice thickens the prefrontal cortex, enhancing focus and allowing you to respond to stressors calmly rather than reacting impulsively.
      
      ### 3. Lowering Cortisol
      By engaging the parasympathetic nervous system (rest and digest) through deep belly breaths, you decrease circulating cortisol and adrenaline levels, lowering resting heart rate and blood pressure.
    `
  }
];
