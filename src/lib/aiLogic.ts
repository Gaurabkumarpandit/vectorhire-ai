// VectorHire AI Logic Utilities

export function getScoreColor(score: number): string {
  if (score >= 90) return "#2563eb";
  if (score >= 75) return "#0ea5e9";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Elite";
  if (score >= 80) return "Advanced";
  if (score >= 70) return "Proficient";
  if (score >= 60) return "Developing";
  return "Foundational";
}

export function getMatchColor(percent: number): string {
  if (percent >= 90) return "bg-blue-100 text-blue-700 border border-blue-200";
  if (percent >= 75) return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (percent >= 60) return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-slate-50 text-slate-600 border border-slate-200";
}

export function getReadinessLabel(percent: number): string {
  if (percent >= 90) return "Future-Ready";
  if (percent >= 80) return "Market-Ready";
  if (percent >= 70) return "Competitive";
  if (percent >= 60) return "Developing";
  return "Emerging";
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "High": return "text-rose-600 bg-rose-50 border-rose-200";
    case "Medium": return "text-amber-600 bg-amber-50 border-amber-200";
    case "Low": return "text-slate-500 bg-slate-50 border-slate-200";
    default: return "text-slate-500 bg-slate-50 border-slate-200";
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Expert": return "text-purple-600 bg-purple-50 border-purple-200";
    case "Advanced": return "text-blue-600 bg-blue-50 border-blue-200";
    case "Intermediate": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "Beginner": return "text-slate-500 bg-slate-50 border-slate-200";
    default: return "text-slate-500 bg-slate-50 border-slate-200";
  }
}

export function formatSalary(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function simulateAIScoring(baseScore: number): number {
  // Simulates AI micro-adjustments to scoring
  const variance = (Math.random() - 0.5) * 4;
  return Math.min(100, Math.max(0, Math.round(baseScore + variance)));
}
