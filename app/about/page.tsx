import { Info, FileSpreadsheet, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 bg-slate-950 min-h-screen text-slate-300">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-800/30 text-emerald-400 mb-4">
          <Info className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
          About PulseHealth
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Discover the architecture, engineering principles, and academic goals behind the PulseHealth platform.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* 1. PROJECT OBJECTIVES */}
        <section className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-900">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-emerald-400" />
            Project Objectives
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            PulseHealth is a fully-functional wellness platform built for the **Artificial Intelligence** course. The platform combines responsive, modern design with interactive tools to help users sync their circadian cycles, compute weight and heart zone metrics, and logs fitness outputs securely.
          </p>
        </section>



        {/* 4. SPEC-KIT PLUS SPECIFICATION */}
        <section className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-900">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
            <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
            Spec-Kit Plus Methodology
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            This project follows strict Spec-Kit Plus development frameworks. All plans, principles, and tasks lists are documented inside the project root:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: "constitution.md", desc: "Defines core mission, technical standards, and clinical/medical disclaimer protocols." },
              { name: "plan.md", desc: "Specifies a four-phase chronological delivery schedule spanning setup to API chatbot links." },
              { name: "tasks/ Folder", desc: "Houses 8 individual markdown files tracking milestones, priority, status, and estimates." }
            ].map((spec, i) => (
              <div key={i} className="bg-slate-950 rounded-2xl p-4 border border-slate-850">
                <code className="text-xs font-bold text-emerald-400 block mb-1">{spec.name}</code>
                <p className="text-[10px] text-slate-500 leading-normal">{spec.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
