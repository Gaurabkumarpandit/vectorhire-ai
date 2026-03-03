"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assessmentChallenges } from "@/lib/mockData";
import { getDifficultyColor } from "@/lib/aiLogic";

function AnalyzingOverlay({ onDone }: { onDone: () => void }) {
  const steps = [
    "Initializing AI evaluation engine...",
    "Parsing code structure and patterns...",
    "Analyzing algorithmic efficiency...",
    "Scoring architecture decisions...",
    "Generating capability report...",
    "Finalizing verified score...",
  ];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useState(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setStep(i);
            if (i === steps.length - 1) {
              setTimeout(() => {
                setDone(true);
                setTimeout(onDone, 800);
              }, 900);
            }
          },
          i * 700
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-100 rounded-3xl p-8 w-80 shadow-2xl shadow-blue-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl score-badge flex items-center justify-center animate-pulse-ring">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5V11L8 14L2 11V5L8 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">AI Engine</p>
            <h3 className="text-sm font-bold text-slate-900">Analyzing Capability</h3>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {steps.map((s, i) => (
            <div key={s} className={`flex items-center gap-2.5 transition-opacity ${i > step ? "opacity-20" : "opacity-100"}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${i < step ? "bg-emerald-100" : i === step ? "bg-blue-100" : "bg-slate-100"}`}>
                {i < step ? (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i === step ? (
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </div>
              <p className={`text-xs ${i === step ? "text-slate-900 font-medium" : i < step ? "text-slate-400 line-through" : "text-slate-300"}`}>
                {s}
              </p>
            </div>
          ))}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
              <path d="M5 8L7 10L11 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Score generated!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function AssessmentPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [scored, setScored] = useState<number | null>(null);
  const [code, setCode] = useState(
    `// Start your solution here
async function buildChatAPI() {
  // Your implementation...
}`
  );

  const challenge = assessmentChallenges.find((c) => c.id === selected);

  const handleStart = (id: number) => {
    setSelected(id);
    setScored(null);
    setCode(`// Start your solution here\nasync function buildChatAPI() {\n  // Your implementation...\n}`);
  };

  const handleSubmit = () => {
    setAnalyzing(true);
  };

  const handleAnalysisDone = () => {
    setAnalyzing(false);
    setScored(89 + Math.floor(Math.random() * 10));
  };

  return (
    <div className="space-y-6">
      {analyzing && <AnalyzingOverlay onDone={handleAnalysisDone} />}

      {!selected ? (
        <>
          <div className="mb-2">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              AI Skill Assessment
            </p>
            <h2 className="text-xl font-bold text-slate-900">Choose a Challenge</h2>
            <p className="text-sm text-slate-500 mt-1">
              Each challenge is a real-world simulation built by our AI engine. Complete them to build your verified score.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {assessmentChallenges.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`glass-card rounded-2xl p-5 ${c.status === "locked" ? "opacity-50" : "card-hover cursor-pointer"}`}
                onClick={() => c.status !== "locked" && c.status !== "completed" && handleStart(c.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyColor(c.difficulty)}`}>
                      {c.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                      {c.duration}
                    </span>
                  </div>
                  {c.status === "completed" && c.score && (
                    <div className="score-badge w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-white leading-none">{c.score}</span>
                    </div>
                  )}
                  {c.status === "locked" && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-300 shrink-0">
                      <rect x="4" y="7" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{c.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{c.description}</p>
                <p className="text-xs text-blue-600 font-medium">{c.category}</p>

                {c.status === "available" && (
                  <button
                    className="mt-4 w-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors"
                    onClick={(e) => { e.stopPropagation(); handleStart(c.id); }}
                  >
                    Start Challenge
                  </button>
                )}
                {c.status === "completed" && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" fill="#d1fae5"/>
                      <path d="M3.5 6L5.5 8L8.5 4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Completed · Score: {c.score}/100
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to challenges
          </button>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Challenge info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyColor(challenge?.difficulty ?? "")}`}>
                    {challenge?.difficulty}
                  </span>
                  <span className="text-[10px] text-slate-400">{challenge?.duration}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mb-2">{challenge?.title}</h2>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{challenge?.description}</p>
                <p className="text-xs font-semibold text-blue-600">{challenge?.category}</p>
              </div>

              {scored && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-5 border border-blue-100"
                >
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">AI Evaluation</p>
                  <div className="flex items-center gap-4">
                    <div className="score-badge w-16 h-16 rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white leading-none">{scored}</span>
                      <span className="text-[10px] text-white/80">Score</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Score Generated</p>
                      <p className="text-xs text-slate-500">Profile updated with new verified data.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="glass-card rounded-2xl p-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Scoring Criteria</p>
                <div className="space-y-2">
                  {["Code correctness", "Architectural quality", "Edge case handling", "Performance efficiency"].map((c) => (
                    <div key={c} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code editor mock */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400 ml-2">solution.ts</span>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full h-72 bg-slate-900 text-emerald-400 text-xs font-mono p-4 resize-none outline-none border-0 leading-relaxed"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                  />
                  <div className="absolute top-2 right-2 animate-scan w-full h-0.5 bg-blue-500/30 pointer-events-none" />
                </div>
                <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    TypeScript · No errors
                  </div>
                  {!scored && (
                    <button
                      onClick={handleSubmit}
                      className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L10 6M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Submit for AI Evaluation
                    </button>
                  )}
                  {scored && (
                    <button
                      onClick={() => setSelected(null)}
                      className="text-xs font-semibold bg-emerald-600 text-white px-4 py-2 rounded-xl"
                    >
                      View Updated Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
