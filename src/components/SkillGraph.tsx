"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { skillRadarData } from "@/lib/mockData";

interface SkillGraphProps {
  data?: typeof skillRadarData;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { skill: string; score: number } }[] }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-slate-900">{d.skill}</p>
        <p className="text-xs text-blue-600 font-bold">{d.score}/100</p>
      </div>
    );
  }
  return null;
};

export default function SkillGraph({
  data = skillRadarData,
  size = "md",
  showLabels = true,
}: SkillGraphProps) {
  const heights = { sm: 200, md: 280, lg: 360 };
  const height = heights[size];

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid
            gridType="polygon"
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          {showLabels && (
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
            />
          )}
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ fill: "#2563eb", r: 3 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
