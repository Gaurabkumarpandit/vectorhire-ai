"use client";

import { motion } from "framer-motion";

interface InsightCardProps {
  icon?: React.ReactNode;
  label?: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  delay?: number;
  className?: string;
}

export default function InsightCard({
  icon,
  label,
  title,
  description,
  badge,
  badgeColor = "bg-blue-50 text-blue-600 border-blue-100",
  delay = 0,
  className = "",
}: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card card-hover rounded-2xl p-6 ${className}`}
    >
      {(icon || label) && (
        <div className="flex items-center gap-2 mb-4">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              {icon}
            </div>
          )}
          {label && (
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {label}
            </span>
          )}
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg border whitespace-nowrap ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
}
