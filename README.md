# PulseHealth - AI-Driven Wellness Platform

PulseHealth is a modern, responsive wellness platform that integrates client-side metrics tracking with medical zones calculation, nutritional guides, and a context-aware AI chatbot assistant. 

This project is built using Next.js 14+ / 16 (App Router), TypeScript, Tailwind CSS, and FastAPI (Python) for the chatbot backend. It is structured according to the **Spec-Kit Plus** development framework.

---

## 🚀 Key Features

1. **Dashboard & Fitness Tracker**: Log physical workouts (Running, Cycling, Swimming, Lifting, Walking), compute calorie burns based on intensity, and record daily water intake via interactive cup grids. Data persists in `LocalStorage`.
2. **Medical & Health Calculators**: Supports metric and imperial BMI calculations, and implements the **Karvonen equation** utilizing age and resting heart rate to establish 5 cardiovascular zone limits.
3. **Wellness & Science Library**: Live client-side category filtering (Sleep, Nutrition, Fitness, Mental Health) and search bar. Articles feature an interactive checklist to help users form healthy habits.
4. **PulseAI Chatbot Companion**: Smart floating chat client with message suggestions and fluid transitions. Communicates with a FastAPI backend or uses a local RAG fallback engine when offline.
5. **Spec-Kit Plus Standardized**: Complete `.spec/` constitution, plan, and 8 milestone tasks.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Client Storage**: HTML5 LocalStorage API

### Backend (Chatbot API)
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Vector Database**: Qdrant Cloud (Vector search)
- **LLM Engine**: OpenAI API (GPT-4o-mini completions)
- **History Database**: Neon Serverless Postgres

---

## 📁 Project Structure

```text
pulse-health/
├── .spec/                     # Spec-Kit Plus documentation folder
│   ├── constitution.md        # Core rules, technical & UI guidelines
│   ├── plan.md                # 4-phase project delivery roadmap
│   └── tasks/                 # Minimum 8 tracking task files (001-008)
├── app/                       # Next.js App Router directories
│   ├── page.tsx               # Homepage + Wellness Onboarding Quiz
│   ├── layout.tsx             # Root template (Navbar, Footer, ChatWidget)
│   ├── about/                 # Group members and project specs
│   ├── tracker/               # Fitness activity and water log dashboard
│   ├── calculator/            # Metric BMI & Karvonen Heart zones tool
│   ├── blog/                  # Wellness library index
│   │   └── [slug]/            # Dynamically loaded article page
│   └── api/
│       └── chat/              # API route communicating with Python or fallback
├── components/                # Reusable UI component modules
│   ├── Navbar.tsx             # Responsive glassmorphism menu
│   ├── Footer.tsx             # Branding and medical disclaimer
│   └── ChatWidget.tsx         # Floating chatbot panel with bubble logic
├── lib/                       # Helpers and mockup assets
│   ├── utils.ts               # Tailwind CSS class merger utility
│   └── data.ts                # Blog database structure
├── backend/                   # FastAPI backend files
│   ├── main.py                # Server entry point and CORS setting
│   ├── requirements.txt       # Python package listings
│   ├── routers/
│   │   └── chat.py            # Post endpoints and postgres history logger
│   └── services/
│       └── rag.py             # Qdrant client matching and OpenAI completions
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Frontend Setup (Next.js)

1. Navigate to the project root directory:
   ```bash
   cd pulse-health
   ```
2. Install node dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 2. Backend Setup (FastAPI)

1. Move to the backend folder:
   ```bash
   cd backend
   ```
2. Set up a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install package requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Launch the FastAPI server:
   ```bash
   python main.py
   ```
5. The API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🔒 Environment Variables (`.env` / `.env.local`)

To unlock full database tracking and vector RAG completions, configure the following keys inside `/backend/.env` or Next.js `.env.local`:

```env
# OpenAI completions
OPENAI_API_KEY=your_openai_api_key

# Qdrant Vector database
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key

# Neon Serverless Postgres logging
DATABASE_URL=your_neon_postgres_db_connection_url
```

*Note: If environment keys are missing, the system automatically falls back to an **Intelligent Local Mock RAG engine** so that the application remains fully functional and testable for grading.*

---

## 🌐 Deployment

- **Frontend**: The Next.js code is fully optimized for Vercel deployment out-of-the-box. Connect your GitHub repository to Vercel, select Next.js preset, and click deploy.
- **Backend**: FastAPI can be hosted on Render, Railway, or Vercel Serverless Python functions. Configure `NEXT_PUBLIC_BACKEND_URL` on the Vercel frontend dashboard to link the chat widgets.

---

## 🎓 Academic Submission Details

- **Course**: Project of Artificial Intelligence
- **Instructor**: Ma'am Mahnoor
- **Submission Date**: 31-May-2026
# PulseHealth
