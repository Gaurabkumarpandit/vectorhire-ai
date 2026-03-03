"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  skillGapData,
  learningRoadmap,
  marketDemandTrend,
  opportunityMatches,
} from "@/lib/mockData";
import { getPriorityColor, getMatchColor } from "@/lib/aiLogic";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          Career Intelligence
        </p>
        <h2 className="text-xl font-bold text-slate-900">Skill Gap & Market Insights</h2>
        <p className="text-sm text-slate-500 mt-1">
          Understand exactly what to build to maximize market value and career trajectory.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Gap Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                Gap Analysis
              </p>
              <h3 className="text-sm font-bold text-slate-900">Skill Gap Breakdown</h3>
            </div>
            <span className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-xl">
              3 critical gaps
            </span>
          </div>

          <div className="space-y-4">
            {skillGapData.map((gap, i) => (
              <motion.div
                key={gap.skill}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">{gap.skill}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${getPriorityColor(gap.priority)}`}>
                      {gap.priority}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-700">{gap.current}</span>
                    <span> → </span>
                    <span className="font-semibold text-blue-600">{gap.target}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-slate-200"
                    style={{ width: `${gap.target}%` }}
                  />
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
                    style={{ width: `${gap.current}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                Market Intelligence
              </p>
              <h3 className="text-sm font-bold text-slate-900">Industry Demand Trend</h3>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-xl">
              94 / 100 Index
            </span>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketDemandTrend}>
                <defs>
                  <linearGradient id="insightGrad" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#insightGrad)"
                  dot={{ fill: "#2563eb", r: 2.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Learning Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
              AI Roadmap
            </p>
            <h3 className="text-sm font-bold text-slate-900">Personalized Learning Path</h3>
          </div>
          <span className="text-xs text-slate-400">Ranked by market impact</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningRoadmap.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                item.status === "in_progress"
                  ? "bg-blue-50 border-blue-200"
                  : item.status === "recommended"
                  ? "bg-white border-blue-100 hover:border-blue-200"
                  : "bg-slate-50 border-slate-100 hover:border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${
                  item.status === "in_progress"
                    ? "text-blue-600 bg-blue-100 border-blue-200"
                    : item.status === "recommended"
                    ? "text-purple-600 bg-purple-50 border-purple-200"
                    : "text-slate-400 bg-slate-100 border-slate-200"
                }`}>
                  {item.status === "in_progress" ? "In Progress" : item.status === "recommended" ? "Recommended" : "Pending"}
                </span>
                <span className="text-xs font-bold text-emerald-600">{item.impact}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1.5">{item.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{item.duration}</span>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI-matched opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="mb-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
            Opportunity Engine
          </p>
          <h3 className="text-sm font-bold text-slate-900">AI-Matched Opportunities</h3>
        </div>

        <div className="space-y-3">
          {opportunityMatches.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {opp.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-900">{opp.role}</p>
                  {opp.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400">{opp.company} · {opp.salary} · {opp.location}</p>
              </div>
              <div className={`text-sm font-bold px-3 py-1.5 rounded-xl shrink-0 ${getMatchColor(opp.matchPercent)}`}>
                {opp.matchPercent}% match
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
