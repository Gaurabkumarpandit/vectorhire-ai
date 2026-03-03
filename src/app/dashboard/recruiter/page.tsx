"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { candidates, recruiterStats } from "@/lib/mockData";
import { getMatchColor, getScoreLabel } from "@/lib/aiLogic";

export default function RecruiterOverviewPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Verified Candidates", value: recruiterStats.totalCandidates.toLocaleString(), sub: "Active in talent pool", color: "text-blue-600" },
          { label: "Avg Match Score", value: `${recruiterStats.averageMatchScore}%`, sub: "Across all matches", color: "text-emerald-600" },
          { label: "Hires This Month", value: recruiterStats.hiresThisMonth, sub: "Via VectorHire", color: "text-slate-900" },
          { label: "Avg Time to Hire", value: recruiterStats.timeToHire, sub: "From first view to offer", color: "text-purple-600" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Ranked candidates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
              AI-Ranked Pool
            </p>
            <h3 className="text-sm font-bold text-slate-900">Verified Talent · Ranked by Ability</h3>
          </div>
          <Link href="/dashboard/recruiter/candidates" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="space-y-3">
          {candidates.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
            >
              {/* Rank */}
              <div className="w-6 text-center text-sm font-bold text-slate-300 shrink-0">
                {i + 1}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {c.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">
                    AI Verified
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${
                    c.status === "Available" ? "text-emerald-600 bg-emerald-50 border-emerald-100" :
                    c.status === "Open to offers" ? "text-blue-600 bg-blue-50 border-blue-100" :
                    "text-amber-600 bg-amber-50 border-amber-100"
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{c.role} · {c.location}</p>
              </div>

              {/* Skills preview */}
              <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="text-[10px] text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-md font-medium">
                    {s}
                  </span>
                ))}
                {c.skills.length > 3 && (
                  <span className="text-[10px] text-slate-400">+{c.skills.length - 3}</span>
                )}
              </div>

              {/* Scores */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">{c.verifiedScore}</p>
                  <p className="text-[10px] text-slate-400">AI Score</p>
                </div>
                <div className={`text-xs font-bold px-2.5 py-1.5 rounded-xl ${getMatchColor(c.matchScore)}`}>
                  {c.matchScore}% match
                </div>
                <Link
                  href={`/dashboard/recruiter/candidates?id=${c.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-xl"
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick insights */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🤖",
            title: "AI Insight",
            desc: "3 candidates this week match 95%+ for your open Senior Engineer role.",
            cta: "Review matches",
          },
          {
            icon: "📈",
            title: "Market Signal",
            desc: "Full-stack demand up 31% YoY. Verified talent supply is tightening.",
            cta: "View forecast",
          },
          {
            icon: "⚡",
            title: "Fast Track",
            desc: "Alex Chen approved your outreach. 97% match for Platform Engineering.",
            cta: "Schedule interview",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            className="glass-card card-hover rounded-2xl p-5"
          >
            <span className="text-2xl mb-3 block">{item.icon}</span>
            <h4 className="text-sm font-semibold text-slate-900 mb-1.5">{item.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.desc}</p>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
              {item.cta}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5H8M5 2L8 5L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
