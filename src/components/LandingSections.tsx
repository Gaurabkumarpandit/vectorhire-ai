"use client";

import { motion } from "framer-motion";
import SkillGraph from "./SkillGraph";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { marketDemandTrend, candidates, opportunityMatches } from "@/lib/mockData";
import { getMatchColor } from "@/lib/aiLogic";

// ─── Section 1: AI Skill Verification Engine ────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">{children}</span>
    </div>
  );
}

const verificationFeatures = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="#2563eb" strokeWidth="1.5"/>
        <path d="M5 8L7 10L11 6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI-Generated Simulations",
    description: "Custom challenges synthesized from real production codebases and engineering scenarios.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#2563eb" strokeWidth="1.5"/>
        <path d="M8 5V8L10 9.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real-World Micro Challenges",
    description: "45-minute focused tasks that mirror actual engineering work, not algorithmic puzzles.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 12L6 7L9 9L12 4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="4" r="1.5" fill="#2563eb"/>
      </svg>
    ),
    title: "Capability Scoring Engine",
    description: "Multi-dimensional scoring across syntax, architecture, efficiency, and problem decomposition.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,2 14,5 14,11 8,14 2,11 2,5" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="8" r="2" fill="#2563eb"/>
      </svg>
    ),
    title: "Dynamic Skill Graph Output",
    description: "Verified capability radar exported as structured data—shareable with any employer.",
  },
];

export function SkillVerificationSection() {
  return (
    <section className="py-24 px-6 bg-white" id="platform">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>AI Skill Verification Engine</SectionLabel>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
              Skills verified by{" "}
              <span className="blue-gradient-text">intelligence</span>,
              not self-report.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-lg">
              Our AI engine builds contextual challenges from real production patterns,
              evaluates your output with multi-dimensional scoring, and generates a verified
              capability profile — not a resume.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {verificationFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 card-hover"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-3 shadow-sm">
                    {f.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{f.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skill graph mock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                    Verified Capability Profile
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900">Alex Chen · Full-Stack Engineer</h3>
                </div>
                <div className="score-badge w-14 h-14 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white leading-none">94</span>
                  <span className="text-[9px] text-white/80 uppercase tracking-wider">Score</span>
                </div>
              </div>

              <SkillGraph size="md" />

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-blue-600">97%</p>
                  <p className="text-xs text-slate-500">Readiness</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-900">7/10</p>
                  <p className="text-xs text-slate-500">Assessed</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-emerald-600">Elite</p>
                  <p className="text-xs text-slate-500">Tier</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: AI Career Brain ──────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-slate-700">{label}</p>
        <p className="text-blue-600">Demand: {payload[0]?.value}</p>
      </div>
    );
  }
  return null;
};

export function CareerBrainSection() {
  return (
    <section className="py-24 px-6 bg-[#f7f9fc]" id="solutions">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>AI Career Brain</SectionLabel>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Your career intelligence,{" "}
            <span className="blue-gradient-text">always ahead.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Predictive market analysis meets personal skill intelligence. Understand where
            your skills rank, where gaps exist, and exactly what to build next.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main chart card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass-card rounded-3xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  Future Demand Index
                </p>
                <h3 className="text-lg font-bold text-slate-900">Full-Stack Engineering Demand</h3>
                <p className="text-sm text-slate-400">7-month predictive trend</p>
              </div>
              <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-blue-200">
                +31% YoY
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketDemandTrend}>
                  <defs>
                    <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#demandGrad)"
                    dot={{ fill: "#2563eb", r: 3 }}
                    activeDot={{ r: 5, fill: "#2563eb" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Side stats */}
          <div className="flex flex-col gap-4">
            {[
              { label: "Salary Potential", value: "$175K", sub: "+18% vs. last year", color: "text-emerald-600" },
              { label: "Skill Gap Score", value: "3 gaps", sub: "LLMs · K8s · DistSystems", color: "text-amber-600" },
              { label: "Demand Forecast", value: "94/100", sub: "Top 6% of engineers", color: "text-blue-600" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card card-hover rounded-2xl p-5 flex-1"
              >
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom features */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "📊", title: "Predictive Market Demand", desc: "Forecasts based on 10K+ live job signals updated daily." },
            { icon: "🔍", title: "Skill Gap Detection", desc: "Identifies exactly which skills close your opportunity gap." },
            { icon: "💰", title: "Salary Potential Forecast", desc: "AI-modeled compensation range based on verified capabilities." },
            { icon: "🗺️", title: "Personalized Roadmap", desc: "Ranked learning priorities with impact scores for each." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card card-hover rounded-2xl p-5"
            >
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h4 className="text-sm font-semibold text-slate-900 mb-1.5">{f.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Reverse Recruiting Marketplace ───────────────────────────────

export function ReverseRecruitingSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Recruiter mock */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                  Reverse Recruiting
                </p>
                <h3 className="text-sm font-bold text-slate-900">Ranked Verified Talent</h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                {candidates.length} candidates
              </span>
            </div>

            <div className="space-y-3">
              {candidates.slice(0, 4).map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 bg-slate-50/80 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      {c.avatar}
                    </div>
                    <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{c.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-blue-600">{c.verifiedScore}</div>
                    <div className="text-[10px] text-slate-400">{c.matchScore}% match</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
              </div>
              <span className="text-xs text-slate-400">Showing top 4 of 2,847</span>
            </div>
          </motion.div>

          {/* Right: Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionLabel>Reverse Recruiting Marketplace</SectionLabel>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
              Talent finds you.{" "}
              <span className="blue-gradient-text">Ranked by ability.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-lg">
              No resume filtering. No keyword matching. Candidates are surfaced by AI-verified
              capability scores — you see only the engineers who have actually proven what they
              claim to know.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: "🚫",
                  title: "No Resume Filtering",
                  desc: "We don't sort by keywords, school names, or job titles. Pure skill signals only.",
                },
                {
                  icon: "🏆",
                  title: "Ranked by Real Ability",
                  desc: "Every candidate is sorted by their AI-verified performance score, not self-assessment.",
                },
                {
                  icon: "🤖",
                  title: "AI Readiness Score",
                  desc: "Each profile includes a Future Readiness Index — how prepared they are for your stack.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Intelligent Opportunity Engine ───────────────────────────────

export function OpportunityEngineSection() {
  return (
    <section className="py-24 px-6 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Intelligent Opportunity Engine</SectionLabel>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Outreach that{" "}
            <span className="blue-gradient-text">actually converts.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Match probability meets context-aware messaging. Every outreach is crafted
            from your verified skill profile — you approve, we send.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {opportunityMatches.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card card-hover rounded-3xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold mb-3">
                    {opp.company[0]}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{opp.role}</h4>
                  <p className="text-xs text-slate-400">{opp.company} · {opp.location}</p>
                </div>
                <div className={`text-sm font-bold px-2.5 py-1 rounded-xl ${getMatchColor(opp.matchPercent)}`}>
                  {opp.matchPercent}%
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                "{opp.outreach.slice(0, 120)}..."
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {opp.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">{opp.salary}</span>
                <button className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors">
                  Approve & Send
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Trust & Data Security ────────────────────────────────────────

const trustItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L17 5V10C17 14 13.5 17.5 10 18C6.5 17.5 3 14 3 10V5L10 2Z" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
        <path d="M7 10L9 12L13 8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI Transparency",
    description: "Every scoring decision is explainable. Candidates see exactly what was evaluated and how their score was derived.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="8" width="12" height="10" rx="2" stroke="#2563eb" strokeWidth="1.5"/>
        <path d="M7 8V6a3 3 0 116 0v2" stroke="#2563eb" strokeWidth="1.5"/>
        <circle cx="10" cy="13" r="1.5" fill="#2563eb"/>
      </svg>
    ),
    title: "Privacy-First Architecture",
    description: "Assessment data is encrypted at rest and in transit. We never train foundational models on your personal data.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#2563eb" strokeWidth="1.5"/>
        <path d="M7 10.5C7 9 8 7.5 10 7.5C12 7.5 13 9 13 10.5C13 12 12 13 10 13" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="15" r="0.75" fill="#2563eb"/>
      </svg>
    ),
    title: "Ethical Skill Evaluation",
    description: "Bias-audited challenge design. No proxies for socioeconomic background, education, or age in our scoring.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 6h14M3 10h14M3 14h8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Enterprise Compliance",
    description: "SOC 2 Type II, GDPR, and CCPA compliant. Right to deletion, data portability, and audit trails included.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L12.5 8H17L13.5 11.5L15 16L10 13L5 16L6.5 11.5L3 8H7.5L10 3Z" stroke="#2563eb" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Verified Authenticity",
    description: "Every assessment is proctored and identity-linked. Scores cannot be purchased, borrowed, or fabricated.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#2563eb" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real-Time Audit Trail",
    description: "Full immutable log of all evaluations, score updates, and data access — exportable on demand.",
  },
];

export function TrustSecuritySection() {
  return (
    <section className="py-24 px-6 bg-white" id="security">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Trust & Data Security</SectionLabel>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Built for enterprise{" "}
            <span className="blue-gradient-text">trust.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Privacy-first architecture, explainable AI, and ethical evaluation design —
            because the future of hiring requires the highest standard of integrity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card card-hover rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Enterprise badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {["SOC 2 Type II", "GDPR Compliant", "CCPA Ready", "ISO 27001", "Zero Data Training"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-slate-600">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="7" cy="7" r="2" fill="white"/>
                </svg>
              </div>
              <span className="font-semibold text-sm">VectorHire</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Where skills become signals. AI-verified talent intelligence for the next era of hiring.
            </p>
          </div>

          {[
            {
              heading: "Platform",
              links: ["AI Verification", "Career Brain", "Opportunity Engine", "Recruiter Dashboard"],
            },
            {
              heading: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              heading: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Security", "Cookie Policy"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                {col.heading}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 VectorHire. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Proof Over Paper. Intelligence Beyond Resumes.
          </p>
        </div>
      </div>
    </footer>
  );
}
