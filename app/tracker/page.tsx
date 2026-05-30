"use client";

import { useState, useEffect } from "react";
import { HeartPulse, Flame, Clock, Compass, GlassWater, Trash2, Calendar, Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Workout {
  id: string;
  type: string;
  duration: number;
  intensity: string;
  calories: number;
  date: string;
}

export default function TrackerPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [water, setWater] = useState(0); // in ml

  // Form State
  const [type, setType] = useState("Running");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("Moderate");

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem("pulse_workouts");
    const savedWater = localStorage.getItem("pulse_water");

    if (savedWorkouts) {
      try {
        setWorkouts(JSON.parse(savedWorkouts));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedWater) {
      setWater(parseInt(savedWater) || 0);
    }
  }, []);

  // Save to LocalStorage when states change
  const saveWorkouts = (list: Workout[]) => {
    setWorkouts(list);
    localStorage.setItem("pulse_workouts", JSON.stringify(list));
  };

  const saveWater = (amount: number) => {
    setWater(amount);
    localStorage.setItem("pulse_water", amount.toString());
  };

  // Calorie Burn Formula
  const calculateCalories = (wType: string, mins: number, level: string) => {
    let baseRate = 5; // kcal per minute
    switch (wType) {
      case "Running":
        baseRate = 11.5;
        break;
      case "Cycling":
        baseRate = 8.5;
        break;
      case "Swimming":
        baseRate = 9.8;
        break;
      case "Lifting":
        baseRate = 6.0;
        break;
      case "Walking":
        baseRate = 4.2;
        break;
    }

    let multiplier = 1.0;
    if (level === "Low") multiplier = 0.8;
    if (level === "High") multiplier = 1.35;

    return Math.round(baseRate * mins * multiplier);
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(duration);
    if (isNaN(mins) || mins <= 0) return;

    const calories = calculateCalories(type, mins, intensity);
    const newWorkout: Workout = {
      id: Date.now().toString(),
      type,
      duration: mins,
      intensity,
      calories,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updated = [newWorkout, ...workouts];
    saveWorkouts(updated);
    setDuration("");
  };

  const handleDeleteWorkout = (id: string) => {
    const updated = workouts.filter((w) => w.id !== id);
    saveWorkouts(updated);
  };

  const clearLogs = () => {
    if (confirm("Are you sure you want to clear all workouts and water history?")) {
      saveWorkouts([]);
      saveWater(0);
    }
  };

  // Metrics
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  
  const waterTarget = 2500; // 2.5 Liters
  const waterPercentage = Math.min(Math.round((water / waterTarget) * 100), 100);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-slate-950 min-h-screen text-slate-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-800/30 text-emerald-400 mb-4">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
            Fitness Tracker Dashboard
          </h1>
          <p className="mt-1 text-slate-400 text-sm max-w-lg">
            Monitor and record metrics locally. Log your athletic sessions, compute calorie burns, and track pure water cups.
          </p>
        </div>
        <button
          onClick={clearLogs}
          className="self-start md:self-center flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 hover:border-red-900/30 text-slate-400 hover:text-red-400 rounded-xl px-4 py-2.5 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Dashboard Logs
        </button>
      </div>

      {/* 1. METRICS ROW SUMMARY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Active Calories", value: `${totalCalories} kcal`, desc: "Total burned energy", icon: Flame, color: "text-amber-400 bg-amber-950/20 border-amber-900/30" },
          { label: "Total Sessions", value: `${totalWorkouts}`, desc: "Completed workouts", icon: Compass, color: "text-emerald-400 bg-emerald-950/20 border-emerald-900/30" },
          { label: "Active Minutes", value: `${totalDuration} mins`, desc: "Time spent exercising", icon: Clock, color: "text-teal-400 bg-teal-950/20 border-teal-900/30" },
          { label: "Daily Hydration", value: `${water} / ${waterTarget} ml`, desc: `${waterPercentage}% of target reached`, icon: GlassWater, color: "text-sky-400 bg-sky-950/20 border-sky-900/30" }
        ].map((met, idx) => (
          <div key={idx} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-900 flex items-start gap-4">
            <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border", met.color)}>
              <met.icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">{met.label}</span>
              <span className="text-2xl font-black text-slate-100 block mt-1">{met.value}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{met.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DOCK BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Workout Form Input */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-slate-900">
          <h2 className="text-lg md:text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Log Your Exercise
          </h2>

          <form onSubmit={handleAddWorkout} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Workout Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-350 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-sm"
              >
                {["Running", "Cycling", "Swimming", "Lifting", "Walking"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Duration (mins)
                </label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Intensity
                </label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-350 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-sm"
                >
                  {["Low", "Moderate", "High"].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold py-3 transition-transform active:scale-95 shadow-[0_4px_15px_rgba(16,185,129,0.15)] flex items-center justify-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Workout Log
            </button>
          </form>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-slate-900 flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-bold text-slate-200 mb-6 self-start flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Hydration Tracker
          </h2>

          {/* Water Glass Animation */}
          <div className="relative w-28 h-44 border-4 border-slate-800 rounded-b-3xl rounded-t-lg overflow-hidden bg-slate-950/60 shadow-inner flex items-end justify-center mb-6">
            {/* Water Fill height dynamically set */}
            <div
              className="w-full bg-gradient-to-t from-sky-600/80 to-sky-400/90 transition-all duration-1000 ease-out flex items-center justify-center"
              style={{ height: `${waterPercentage}%` }}
            >
              <span className="text-slate-950 font-black text-sm absolute select-none">
                {waterPercentage}%
              </span>
            </div>
            {/* Ambient bubble particles */}
            <span className="absolute bottom-2 left-4 h-1 w-1 bg-white/20 rounded-full animate-ping" />
            <span className="absolute bottom-10 right-6 h-1.5 w-1.5 bg-white/20 rounded-full animate-ping delay-500" />
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => saveWater(water + 250)}
              className="py-2.5 rounded-xl border border-slate-850 bg-slate-950 hover:bg-sky-950/20 hover:border-sky-500/50 text-slate-350 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              +250ml Glass
            </button>
            <button
              onClick={() => saveWater(water + 500)}
              className="py-2.5 rounded-xl border border-slate-850 bg-slate-950 hover:bg-sky-950/20 hover:border-sky-500/50 text-slate-350 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              +500ml Bottle
            </button>
          </div>

          <button
            onClick={() => saveWater(0)}
            disabled={water === 0}
            className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-[10px] text-slate-500 hover:text-slate-300 font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Clear Water intake
          </button>
        </div>

        {/* Logs Table / Listing */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-slate-900 flex flex-col h-[380px]">
          <h2 className="text-lg md:text-xl font-bold text-slate-200 mb-6 flex items-center gap-2 shrink-0">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            Activity Log History
          </h2>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {workouts.length > 0 ? (
              workouts.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-250">{w.type}</span>
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-md",
                        w.intensity === "High" ? "bg-rose-950 text-rose-400" : w.intensity === "Low" ? "bg-blue-950 text-blue-400" : "bg-slate-900 text-slate-400"
                      )}>
                        {w.intensity}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {w.duration} mins
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {w.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-emerald-400 shrink-0">{w.calories} kcal</span>
                    <button
                      onClick={() => handleDeleteWorkout(w.id)}
                      className="text-slate-600 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-900 transition-colors"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <HeartPulse className="h-10 w-10 mb-2 text-slate-700 animate-pulse" />
                <p className="text-xs">No logged sessions. Submit the logging form to add entries.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
