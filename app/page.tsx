"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  HeartPulse,
  Calculator,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  Award,
  Zap
} from "lucide-react";

export default function Home() {
  // Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0: intro, 1-4: questions, 5: results
  const [answers, setAnswers] = useState({
    sleep: "",
    water: "",
    activity: "",
    goal: ""
  });
  const [quizScore, setQuizScore] = useState(0);
  const [quizTips, setQuizTips] = useState<string[]>([]);

  const handleAnswerSelect = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setQuizStep((prev) => prev + 1);
  };

  const calculateQuizResults = () => {
    let score = 0;
    const tips: string[] = [];

    // Sleep evaluation
    if (answers.sleep === "7-9") {
      score += 30;
      tips.push("Excellent sleep duration! Keep maintaining this routine.");
    } else if (answers.sleep === "5-6") {
      score += 15;
      tips.push("Aim for 7-9 hours. Consider reading our sleep guide on Circadian Rhythms.");
    } else {
      score += 5;
      tips.push("Critical sleep deprivation. Prioritize sleep hygiene tonight.");
    }

    // Water evaluation
    if (answers.water === "2l+") {
      score += 25;
      tips.push("Superb hydration! Your cellular networks are well-fueled.");
    } else if (answers.water === "1-2l") {
      score += 15;
      tips.push("Aim for 2.5 liters. Try our click-to-drink visual water log on the Tracker page.");
    } else {
      score += 5;
      tips.push("Severe dehydration warning. Drink a glass of water right now.");
    }

    // Activity evaluation
    if (answers.activity === "30m+") {
      score += 25;
      tips.push("Great active minutes! You are supporting cardiovascular health.");
    } else if (answers.activity === "10-30m") {
      score += 15;
      tips.push("Good effort. Try adding 10-15 minutes of steady Zone 2 cardio walk daily.");
    } else {
      score += 5;
      tips.push("Sedentary levels are high. Try set a timer to stand up and stretch every hour.");
    }

    // Goal tip
    if (answers.goal === "weight") {
      tips.push("Focus on nutrient-dense calorie logging and steady caloric expenditure.");
    } else if (answers.goal === "energy") {
      tips.push("Incorporate cognitive foods (Omega-3s, blueberries) and sleep synchronization.");
    } else {
      tips.push("Prioritize Zone 2 cardio base building (150 mins/week) to boost stamina.");
    }

    setQuizScore(score);
    setQuizTips(tips);
    setQuizStep(5);
  };

  const resetQuiz = () => {
    setAnswers({ sleep: "", water: "", activity: "", goal: "" });
    setQuizStep(0);
  };

  const features = [
    {
      title: "Interactive Fitness Tracker",
      description: "Log your workouts, count burned calories, and view real-time statistics stored in browser memory.",
      icon: HeartPulse,
      href: "/tracker",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
    },
    {
      title: "Health Calculators",
      description: "Instantly check your Body Mass Index (BMI) ranges and optimize your maximum target heart rate zones.",
      icon: Calculator,
      href: "/calculator",
      color: "from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/30"
    },
    {
      title: "Wellness & Science Blog",
      description: "Access curated articles from clinical experts regarding circadian rhythm, cognitive food fuel, and longevity.",
      icon: BookOpen,
      href: "/blog",
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        {/* Glow Accent Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-900 mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Personal Wellness Platform
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
            Take Control of Your Health with{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              PulseHealth
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Track daily hydration, log active minutes, calculate diagnostic zones, and chat with our context-aware AI assistant. All your personal data is kept secure and private.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/tracker"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-semibold px-6 py-3.5 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
            >
              Start Fitness Log
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/calculator"
              className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 px-6 py-3.5 transition-all"
            >
              Compute Health BMI
            </Link>
          </div>

          {/* Quick Metrics Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Water Tracked Today", val: "LocalStorage Save" },
              { label: "Heart Rate Formula", val: "Haskell/Karvonen" },
              { label: "AI Wellness Assistant", val: "Chatbot Companion" },
              { label: "Scientific Articles", val: "Expert Verified" }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-slate-900 flex flex-col items-center">
                <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  {stat.val}
                </span>
                <span className="text-xs text-slate-500 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC WELLNESS ONBOARDING QUIZ */}
      <section className="max-w-4xl mx-auto px-4 mt-20 relative">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 md:p-10 border border-slate-800/80 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
          
          {quizStep === 0 && (
            <div className="text-center py-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/30 mb-4">
                <HelpCircle className="h-7 w-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
                Check Your Daily Wellness Score
              </h2>
              <p className="mt-3 text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                Answer 4 quick questions about your sleeping, hydration, and activity habits to generate a custom score and recommended wellness actions.
              </p>
              <button
                onClick={() => setQuizStep(1)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold px-6 py-3 hover:scale-105 active:scale-95 transition-transform"
              >
                Start Quiz
                <Zap className="h-4 w-4" />
              </button>
            </div>
          )}

          {quizStep === 1 && (
            <div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
                <span>QUESTION 1 OF 4</span>
                <span>25% COMPLETED</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-200 mb-6">
                How many hours of sleep did you get last night?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: "7-9", label: "7 to 9 Hours (Optimal)" },
                  { key: "5-6", label: "5 to 6 Hours (Moderate)" },
                  { key: "less-5", label: "Under 5 Hours (Short)" }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleAnswerSelect("sleep", opt.key)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-emerald-950/20 hover:border-emerald-500/50 text-slate-300 hover:text-slate-100 text-sm font-medium text-left transition-all duration-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 2 && (
            <div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
                <span>QUESTION 2 OF 4</span>
                <span>50% COMPLETED</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-200 mb-6">
                How much pure water have you consumed today?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: "2l+", label: "Over 2 Liters (Hydrated)" },
                  { key: "1-2l", label: "1 to 2 Liters (Moderate)" },
                  { key: "less-1l", label: "Under 1 Liter (Dehydrated)" }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleAnswerSelect("water", opt.key)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-emerald-950/20 hover:border-emerald-500/50 text-slate-300 hover:text-slate-100 text-sm font-medium text-left transition-all duration-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 3 && (
            <div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
                <span>QUESTION 3 OF 4</span>
                <span>75% COMPLETED</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-200 mb-6">
                How many minutes of physical activity did you complete today?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: "30m+", label: "30+ Minutes (Active)" },
                  { key: "10-30m", label: "10 to 30 Minutes (Light)" },
                  { key: "less-10m", label: "Under 10 Minutes (Sedentary)" }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleAnswerSelect("activity", opt.key)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-emerald-950/20 hover:border-emerald-500/50 text-slate-300 hover:text-slate-100 text-sm font-medium text-left transition-all duration-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep === 4 && (
            <div>
              <div className="flex justify-between items-center text-xs text-slate-500 mb-6">
                <span>QUESTION 4 OF 4</span>
                <span>95% COMPLETED</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-200 mb-6">
                What is your primary wellness goal for this season?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { key: "weight", label: "Healthy Weight & Composition" },
                  { key: "energy", label: "Stamina & Cognitive Focus" },
                  { key: "cardio", label: "Mitochondrial & Cardio Fitness" }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={(e) => {
                      // Save and trigger results compilation
                      setAnswers((prev) => ({ ...prev, goal: opt.key }));
                      // We must run compile in next tick
                    }}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-emerald-950/20 hover:border-emerald-500/50 text-slate-300 hover:text-slate-100 text-sm font-medium text-left transition-all duration-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-end border-t border-slate-850 pt-4">
                <button
                  onClick={calculateQuizResults}
                  disabled={!answers.sleep || !answers.water || !answers.activity}
                  className="rounded-xl bg-emerald-500 text-slate-950 px-6 py-2.5 font-bold hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  Compile Daily Summary
                </button>
              </div>
            </div>
          )}

          {quizStep === 5 && (
            <div className="text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/30 mb-4 animate-bounce">
                <Award className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">
                Your Health Wellness Score
              </h2>
              
              {/* Score Display */}
              <div className="my-6 inline-flex flex-col items-center">
                <span className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  {quizScore}
                </span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1">Out of 100 Points</span>
              </div>

              {/* Progress Slider */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850 max-w-sm mx-auto mb-6">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                  style={{ width: `${quizScore}%` }}
                />
              </div>

              {/* Recommendations list */}
              <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-5 text-left max-w-xl mx-auto mb-6 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  Your Personalized Recommendations
                </h4>
                {quizTips.map((tip, idx) => (
                  <p key={idx} className="text-sm text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-3">
                    {tip}
                  </p>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={resetQuiz}
                  className="text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-4 py-2.5 rounded-xl transition-all"
                >
                  Restart Quiz
                </button>
                <Link
                  href="/tracker"
                  className="text-xs bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Start Tracking Log
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. PLATFORM CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100">
            Platform Utilities
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
            Everything you need to monitor metrics, calculate diagnostics, and read expert wellness research in one screen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <Link
              key={idx}
              href={feat.href}
              className="flex flex-col p-6 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-950 border border-slate-900 hover:border-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5 group"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feat.color} border mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                {feat.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                {feat.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1.5 transition-transform">
                Open Utility
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 mt-28">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-950/40 border border-slate-900 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-3 relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
              Ready to start your wellness metrics tracker?
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Log activities, log hydration cups, and check body diagnostic parameters. Everything resides in secure local storage right in your browser.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/tracker"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold px-6 py-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
            >
              Open Tracker Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
