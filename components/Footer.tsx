import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-100">
                PulseHealth
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              Your personalized AI-driven wellness companion. Log workouts, track water intake, compute medical zone indicators, and learn from experts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Platform Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tracker" className="hover:text-emerald-400 transition-colors">
                  Fitness Tracker
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-emerald-400 transition-colors">
                  Health Calculators
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Wellness Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Academic Submission
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Project of Artificial Intelligence</li>
              <li>Instructor: Ma&apos;am Mahnoor</li>
              <li>Date: May 2026</li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors underline decoration-dotted">
                  About Group & Spec-Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Warning */}
        <div className="border-t border-slate-900/60 pt-6 mt-6">
          <div className="rounded-lg bg-slate-900/40 p-4 border border-slate-900">
            <p className="text-xs text-slate-500 leading-relaxed text-center md:text-left">
              <span className="font-semibold text-amber-500/80 mr-1">Medical Disclaimer:</span>
              PulseHealth does not provide professional medical advice, diagnosis, or treatment. The calculations, trackers, and AI chatbot responses are for informational and educational purposes only. Always consult with a qualified physician or healthcare professional regarding any medical concerns.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} PulseHealth. All rights reserved.</p>
            <p className="mt-2 md:mt-0">AI Driven Website Development Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
