"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const heroSkillData = [
  { skill: "React", score: 96 },
  { skill: "Node.js", score: 88 },
  { skill: "System Design", score: 82 },
  { skill: "TypeScript", score: 94 },
  { skill: "Cloud", score: 76 },
  { skill: "AI/ML", score: 71 },
];

const typingPhrases = [
  "Verified Talent.",
  "Intelligent Hiring.",
  "Real Skill Proof.",
  "Vector Precision.",
];

function TypingEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = typingPhrases[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayed.length < phrase.length) {
            setDisplayed(phrase.slice(0, displayed.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (displayed.length > 0) {
            setDisplayed(displayed.slice(0, -1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % typingPhrases.length);
          }
        }
      },
      isDeleting ? 55 : 95
    );
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span className="blue-gradient-text">
      {displayed}
      <span className="animate-cursor inline-block w-0.5 h-8 bg-blue-500 ml-1 align-middle" />
    </span>
  );
}

function HeroSkillVisual() {
  const [animating, setAnimating] = useState(false);
  const [score, setScore] = useState(94);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setScore(Math.floor(Math.random() * 8) + 88);
      setTimeout(() => setAnimating(false), 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient blobs */}
      <div className="ambient-blob w-72 h-72 bg-blue-200/30 top-0 left-0 -translate-x-8 -translate-y-8" />
      <div className="ambient-blob w-56 h-56 bg-cyan-200/20 bottom-0 right-0 translate-x-8 translate-y-8" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative glass-card rounded-3xl p-6 w-full max-w-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                AI Verification Active
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900">Alex Chen</p>
            <p className="text-xs text-slate-400">Full-Stack Engineer</p>
          </div>
          <motion.div
            animate={{ scale: animating ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="score-badge w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg"
          >
            <span className="text-lg font-bold text-white leading-none">{score}</span>
            <span className="text-[9px] text-white/80 uppercase tracking-wider">Score</span>
          </motion.div>
        </div>

        {/* Radar Chart */}
        <div className="h-52 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={heroSkillData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <PolarGrid gridType="polygon" stroke="#e2e8f0" strokeWidth={1} />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.18}
                strokeWidth={2}
                dot={{ fill: "#2563eb", r: 2.5 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill bars */}
        <div className="mt-3 space-y-2">
          {heroSkillData.slice(0, 3).map((s) => (
            <div key={s.skill} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-24 shrink-0">{s.skill}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.score}%` }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                />
              </div>
              <span className="text-xs font-semibold text-slate-700 w-7 text-right">{s.score}</span>
            </div>
          ))}
        </div>

        {/* Footer badges */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-lg">
            97% Market Ready
          </span>
          <span className="text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-lg">
            AI Verified
          </span>
        </div>
      </motion.div>

      {/* Floating mini cards */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute -top-4 -right-4 glass-card rounded-xl px-3 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-slate-700">3 new matches</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute -bottom-4 -left-4 glass-card rounded-xl px-3 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2L8.5 5.5L12 6.5L9.5 9L10 12.5L7 11L4 12.5L4.5 9L2 6.5L5.5 5.5L7 2Z" fill="#f59e0b" />
          </svg>
          <span className="text-xs font-semibold text-slate-700">Elite Tier</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />
      <div className="ambient-blob w-[500px] h-[400px] bg-blue-100/40 top-0 right-0 translate-x-1/4 -translate-y-1/4" />
      <div className="ambient-blob w-[300px] h-[300px] bg-cyan-100/30 bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                AI-Powered Talent Intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
              Verified Talent.
            </h1>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              <TypingEffect />
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-8">
              Replace resumes with AI-verified skill intelligence and predictive
              career matching. Proof over paper — where skills become signals.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/dashboard/student"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
              >
                Get Verified
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/dashboard/recruiter"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 text-slate-700 hover:text-blue-700 font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Hire Talent
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {["AC", "PS", "MW", "YT"].map((init, i) => (
                    <div
                      key={init}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ zIndex: 4 - i }}
                    >
                      {init[0]}
                    </div>
                  ))}
                </div>
                <span>2,800+ verified</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★★★★★</span>
                <span>4.9 / 5 enterprise rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <div className="flex justify-center lg:justify-end">
            <HeroSkillVisual />
          </div>
        </div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 border-t border-slate-100 pt-12"
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-8">
            Trusted by engineering-led companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
            {["Stripe", "Linear", "Vercel", "Figma", "Notion", "Loom"].map((name) => (
              <span key={name} className="text-sm font-bold text-slate-500 tracking-tight">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
