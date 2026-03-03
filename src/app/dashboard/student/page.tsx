"use client";

import { motion } from "framer-motion";
import SkillGraph from "@/components/SkillGraph";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  studentProfile,
  marketDemandTrend,
  opportunityMatches,
  skillRadarData,
} from "@/lib/mockData";
import { getMatchColor, getReadinessLabel } from "@/lib/aiLogic";
import Link from "next/link";

function StatCard({
  label,
  value,
  sub,
  color = "text-slate-900",
  delay = 0,
}: {
  label: string;
  value: string | number;
  sub: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card rounded-2xl p-5"
    >
      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-3xl font-bold mb-1 ${color}`}>{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </motion.div>
  );
}

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Verified Score"
          value={studentProfile.verifiedScore}
          sub="Elite Tier · Top 6%"
          color="text-blue-600"
          delay={0}
        />
        <StatCard
          label="Market Readiness"
          value={`${studentProfile.readinessPercent}%`}
          sub={getReadinessLabel(studentProfile.readinessPercent)}
          color="text-emerald-600"
          delay={0.08}
        />
        <StatCard
          label="Salary Potential"
          value="$175K"
          sub="Based on verified skills"
          color="text-slate-900"
          delay={0.16}
        />
        <StatCard
          label="Market Demand"
          value={`${studentProfile.futureReadinessIndex}/100`}
          sub="Future Demand Index"
          color="text-purple-600"
          delay={0.24}
        />
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                Skill Profile
              </p>
              <h3 className="text-sm font-bold text-slate-900">Capability Radar</h3>
            </div>
            <div className="score-badge w-12 h-12 rounded-xl flex flex-col items-center justify-center">
              <span className="text-base font-bold text-white leading-none">{studentProfile.verifiedScore}</span>
              <span className="text-[8px] text-white/80">Score</span>
            </div>
          </div>
          <SkillGraph size="md" />
          <div className="mt-3 space-y-2">
            {skillRadarData.slice(0, 4).map((s) => (
              <div key={s.skill} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-28 shrink-0">{s.skill}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-6 text-right">{s.score}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 lg:col-span-2"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                Market Intelligence
              </p>
              <h3 className="text-sm font-bold text-slate-900">Demand Trend for Your Skills</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-xl">
              +31% YoY
            </span>
          </div>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketDemandTrend}>
                <defs>
                  <linearGradient id="demandGradDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 11 }}
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="url(#demandGradDash)"
                  dot={{ fill: "#2563eb", r: 2.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick insights */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Current Demand", value: "94/100", color: "text-blue-600" },
              { label: "Salary Range", value: "$145–185K", color: "text-slate-900" },
              { label: "Growth Rate", value: "+31% YoY", color: "text-emerald-600" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Opportunity matches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
              AI-Matched Opportunities
            </p>
            <h3 className="text-sm font-bold text-slate-900">Curated for Your Profile</h3>
          </div>
          <Link href="/dashboard/student/insights" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {opportunityMatches.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
              className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold">
                  {opp.company[0]}
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${getMatchColor(opp.matchPercent)}`}>
                  {opp.matchPercent}%
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 mb-0.5">{opp.role}</h4>
              <p className="text-xs text-slate-400 mb-2">{opp.company}</p>
              <p className="text-xs font-medium text-slate-600">{opp.salary}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
