"use client";

import React from 'react';

interface ArcProgressProps {
  percentage: number;
}

const ArcProgress: React.FC<ArcProgressProps> = ({ percentage }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <svg className="overflow-visible" width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
      <circle
        cx="44"
        cy="44"
        r={radius}
        fill="none"
        stroke="url(#lg1)"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 44 44)"
      />
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#c6f135" />
        </linearGradient>
      </defs>
      <text x="44" y="40" textAnchor="middle" fill="#c6f135" className="font-display text-lg font-bold">
        {Math.round(percentage)}%
      </text>
      <text x="44" y="54" textAnchor="middle" fill="var(--snow3)" className="text-[9px] font-sans">
        of goal
      </text>
    </svg>
  );
};

export default ArcProgress;