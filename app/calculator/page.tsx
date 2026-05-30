"use client";

import { useState } from "react";
import { Calculator, ShieldAlert, Heart, TrendingUp, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalculatorPage() {
  // BMI State
  const [bmiUnit, setBmiUnit] = useState<"metric" | "imperial">("metric");
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiTips, setBmiTips] = useState("");

  // Heart Rate State
  const [hrAge, setHrAge] = useState("");
  const [hrRest, setHrRest] = useState("");
  const [hrZones, setHrZones] = useState<{ name: string; range: string; desc: string; intensity: string }[] | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    let bmi = 0;
    if (bmiUnit === "metric") {
      // weight (kg) / [height (m)]^2
      const heightInMeters = h / 100;
      bmi = w / (heightInMeters * heightInMeters);
    } else {
      // 703 * weight (lbs) / [height (inches)]^2
      bmi = (703 * w) / (h * h);
    }

    const roundedBmi = parseFloat(bmi.toFixed(1));
    setBmiResult(roundedBmi);

    // Categories
    if (roundedBmi < 18.5) {
      setBmiCategory("Underweight");
      setBmiTips("Focus on nutrient-dense snacks, compound strength training to build lean muscle, and consult a nutritionist to safely add calories.");
    } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
      setBmiCategory("Normal Weight");
      setBmiTips("Excellent! Keep up your steady hydration and 150 minutes of active Zone 2 cardio per week to preserve this baseline.");
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setBmiCategory("Overweight");
      setBmiTips("Incorporate a moderate calorie deficit, swap refined grains for whole fibers, and combine Zone 2 cardio with functional lifting.");
    } else {
      setBmiCategory("Obese");
      setBmiTips("Prioritize regular low-impact activities (swimming, walking) to protect joints, record meal logs, and partner with clinical guides.");
    }
  };

  const calculateHeartRate = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(hrAge);
    const rhr = parseInt(hrRest) || 60; // default to 60 if empty

    if (isNaN(age) || age <= 0 || age > 120) return;

    const maxHR = 220 - age;
    const hrReserve = maxHR - rhr;

    // Standard Karvonen Intensity thresholds
    const zonesConfig = [
      { name: "Zone 1 (Warm Up)", min: 0.50, max: 0.60, desc: "Active recovery, metabolic warm up, and fat mobilization.", color: "border-blue-500 text-blue-400" },
      { name: "Zone 2 (Aerobic Base)", min: 0.60, max: 0.70, desc: "Optimal mitochondria building, fat oxidation, and longevity.", color: "border-emerald-500 text-emerald-400" },
      { name: "Zone 3 (Tempo Cardio)", min: 0.70, max: 0.80, desc: "Improves cardiovascular strength, lung capacity, and endurance.", color: "border-teal-500 text-teal-400" },
      { name: "Zone 4 (Threshold)", min: 0.80, max: 0.90, desc: "Increases anaerobic capacity, lactic acid clearance rate.", color: "border-amber-500 text-amber-400" },
      { name: "Zone 5 (Peak Effort)", min: 0.90, max: 1.00, desc: "Short high-intensity intervals, athletic output power.", color: "border-rose-500 text-rose-400" }
    ];

    const results = zonesConfig.map((z) => {
      const targetMin = Math.round(hrReserve * z.min + rhr);
      const targetMax = Math.round(hrReserve * z.max + rhr);
      return {
        name: z.name,
        intensity: `${Math.round(z.min * 100)}% - ${Math.round(z.max * 100)}%`,
        range: `${targetMin} - ${targetMax} BPM`,
        desc: z.desc
      };
    });

    setHrZones(results);
  };

  const getBmiPosition = (val: number) => {
    // scale from 15 to 35
    if (val < 15) return 0;
    if (val > 35) return 100;
    return ((val - 15) / 20) * 100;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-slate-950 min-h-screen text-slate-300">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-800/30 text-emerald-400 mb-4">
          <Calculator className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
          Wellness Calculators
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Compute body mass indices and optimal cardiovascular heart rate zones with formulas recommended by sports physiologists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* BMI Calculator Box */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-900 relative">
          <h2 className="text-xl md:text-2xl font-bold text-slate-200 flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Body Mass Index (BMI)
          </h2>

          <div className="flex border-b border-slate-800 mb-6">
            <button
              onClick={() => {
                setBmiUnit("metric");
                setBmiHeight("");
                setBmiWeight("");
                setBmiResult(null);
              }}
              className={cn(
                "flex-1 pb-3 text-center text-sm font-semibold border-b-2 transition-all",
                bmiUnit === "metric" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              Metric (cm / kg)
            </button>
            <button
              onClick={() => {
                setBmiUnit("imperial");
                setBmiHeight("");
                setBmiWeight("");
                setBmiResult(null);
              }}
              className={cn(
                "flex-1 pb-3 text-center text-sm font-semibold border-b-2 transition-all",
                bmiUnit === "imperial" ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              Imperial (in / lbs)
            </button>
          </div>

          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  {bmiUnit === "metric" ? "Height (cm)" : "Height (inches)"}
                </label>
                <input
                  type="number"
                  required
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  placeholder={bmiUnit === "metric" ? "e.g. 175" : "e.g. 68"}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  {bmiUnit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
                </label>
                <input
                  type="number"
                  required
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  placeholder={bmiUnit === "metric" ? "e.g. 70" : "e.g. 154"}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold py-3 transition-transform active:scale-95 shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
            >
              Calculate BMI
            </button>
          </form>

          {/* BMI Result Overlay */}
          {bmiResult !== null && (
            <div className="mt-8 border-t border-slate-850 pt-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Your Result</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-100">{bmiResult}</span>
                    <span className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-md",
                      bmiCategory === "Normal Weight" && "bg-emerald-950 text-emerald-400",
                      bmiCategory === "Underweight" && "bg-blue-950 text-blue-400",
                      bmiCategory === "Overweight" && "bg-amber-950 text-amber-400",
                      bmiCategory === "Obese" && "bg-rose-950 text-rose-400"
                    )}>
                      {bmiCategory}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider Scale visualizer */}
              <div className="relative mt-8 mb-6">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-rose-500 border border-slate-950" />
                <div
                  className="absolute -top-2 flex flex-col items-center -translate-x-1/2 transition-all duration-700"
                  style={{ left: `${getBmiPosition(bmiResult)}%` }}
                >
                  <div className="h-7 w-2 bg-slate-100 rounded-full border border-slate-950 shadow-md shadow-slate-900" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-semibold">
                  <span>15.0</span>
                  <span>18.5 (Normal)</span>
                  <span>25.0 (Overweight)</span>
                  <span>30.0 (Obese)</span>
                  <span>35.0</span>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Health Recommendation</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{bmiTips}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Heart Rate Zones Box */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-900">
          <h2 className="text-xl md:text-2xl font-bold text-slate-200 flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            Target Heart Rate Zones
          </h2>

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Input your age and resting heart rate to establish custom active zone parameters based on the clinically accepted Karvonen heart reserve equation.
          </p>

          <form onSubmit={calculateHeartRate} className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  required
                  value={hrAge}
                  onChange={(e) => setHrAge(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Resting HR (BPM)
                </label>
                <input
                  type="number"
                  value={hrRest}
                  onChange={(e) => setHrRest(e.target.value)}
                  placeholder="e.g. 60 (Optional)"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-slate-950 font-bold py-3 transition-transform active:scale-95 shadow-[0_4px_15px_rgba(20,184,166,0.15)]"
            >
              Calculate Heart Zones
            </button>
          </form>

          {/* Zones Output Listing */}
          {hrZones ? (
            <div className="space-y-3 animate-in fade-in duration-300">
              {hrZones.map((z, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-4 rounded-2xl bg-slate-950 border transition-all flex flex-col sm:flex-row sm:items-center gap-3 justify-between",
                    z.name.includes("Zone 2") ? "border-emerald-500/35 bg-emerald-950/5" : "border-slate-850"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider",
                        z.name.includes("Zone 1") && "text-blue-400",
                        z.name.includes("Zone 2") && "text-emerald-400",
                        z.name.includes("Zone 3") && "text-teal-400",
                        z.name.includes("Zone 4") && "text-amber-400",
                        z.name.includes("Zone 5") && "text-rose-400"
                      )}>
                        {z.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">({z.intensity})</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">{z.desc}</p>
                  </div>
                  <div className="text-right sm:shrink-0 flex items-center sm:flex-col gap-1.5 sm:gap-0 justify-between mt-2 sm:mt-0">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest sm:hidden">Target:</span>
                    <span className="text-lg font-black text-slate-200">{z.range}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 border border-dashed border-slate-850 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-500">
              <Heart className="h-8 w-8 mb-2 animate-pulse text-slate-600" />
              <p className="text-xs">Submit your parameters to estimate aerobic, anaerobic, and mitochondrial training bands.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
