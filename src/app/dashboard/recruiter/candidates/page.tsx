"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { candidates } from "@/lib/mockData";
import { getMatchColor, getScoreLabel, getScoreColor } from "@/lib/aiLogic";
import SkillGraph from "@/components/SkillGraph";
import { skillRadarData } from "@/lib/mockData";

const filters = ["All", "Available", "Open to offers", "Interviewing"];

export default function CandidatesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inviteSent, setInviteSent] = useState<number[]>([]);

  const filtered = activeFilter === "All" ? candidates : candidates.filter((c) => c.status === activeFilter);
  const selected = candidates.find((c) => c.id === selectedId);

  const handleInvite = (id: number) => {
    setInviteSent((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          Talent Discovery
        </p>
        <h2 className="text-xl font-bold text-slate-900">AI-Ranked Verified Candidates</h2>
        <p className="text-sm text-slate-500 mt-1">
          Browse the verified talent pool. Every candidate ranked by AI-assessed capability — no resume filtering required.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all ${
              activeFilter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {f}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-xs text-slate-400">{filtered.length} candidates</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Candidate list */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onClick={() => setSelectedId(c.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedId === c.id
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/70"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{c.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-blue-600">{c.verifiedScore}</div>
                  <div className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${getMatchColor(c.matchScore)}`}>
                    {c.matchScore}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-6 space-y-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg font-bold text-white">
                      {selected.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{selected.name}</h3>
                      <p className="text-sm text-slate-400">{selected.role} · {selected.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                          AI Verified
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
                          selected.status === "Available" ? "text-emerald-600 bg-emerald-50 border-emerald-100" :
                          selected.status === "Open to offers" ? "text-blue-600 bg-blue-50 border-blue-100" :
                          "text-amber-600 bg-amber-50 border-amber-100"
                        }`}>
                          {selected.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="score-badge w-16 h-16 rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white leading-none">{selected.verifiedScore}</span>
                    <span className="text-[9px] text-white/80">Score</span>
                  </div>
                </div>

                {/* Match + capabilities */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className={`text-lg font-bold ${selected.matchScore >= 90 ? "text-blue-600" : "text-slate-700"}`}>{selected.matchScore}%</p>
                    <p className="text-[10px] text-slate-400">Match Score</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-emerald-600">{selected.readiness}%</p>
                    <p className="text-[10px] text-slate-400">AI Readiness</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-purple-600">{getScoreLabel(selected.verifiedScore)}</p>
                    <p className="text-[10px] text-slate-400">Tier</p>
                  </div>
                </div>

                {/* Skill graph */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Capability Radar</p>
                  <SkillGraph size="sm" showLabels={true} />
                </div>

                {/* AI evaluation */}
                <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">AI Evaluation</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{selected.aiNote}</p>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Verified Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map((s) => (
                      <span key={s} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 border-t border-slate-100">
                  {inviteSent.includes(selected.id) ? (
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                        <path d="M5 8L7 10L11 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Interview request sent!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleInvite(selected.id)}
                      className="flex-1 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors"
                    >
                      Send Interview Invite
                    </button>
                  )}
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-xl transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1C4 1 1 4 1 7s3 6 6 6 6-3 6-6-3-6-6-6Z" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M7 5v2l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    Schedule Later
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center h-full min-h-64"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#2563eb" strokeWidth="1.5"/>
                    <path d="M16 16L20 20" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">Select a Candidate</h3>
                <p className="text-xs text-slate-400">
                  Click any candidate to view their full AI-verified skill profile, capability breakdown, and behavioral insights.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
