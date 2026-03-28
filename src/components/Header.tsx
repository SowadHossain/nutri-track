"use client";

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-[22px] py-[16px] bg-ink/85 backdrop-blur-xl border-b border-line">
      <div className="font-display text-xl font-bold tracking-tighter text-lime flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-lime shadow-lime-glow animate-pulse"></div>
        NutriTrack
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-semibold tracking-tight">Alex Johnson</div>
          <div className="text-xs text-snow-300">Week 3 · Cut phase</div>
        </div>
        <div className="w-[38px] h-[38px] rounded-full border-[1.5px] border-line bg-gradient-to-br from-[#1e3a2f] to-[#0d2318] flex items-center justify-center font-display text-sm font-semibold text-lime relative cursor-pointer">
          AJ
          <div className="absolute bottom-[1px] right-[1px] w-[9px] h-[9px] rounded-full bg-lime border-2 border-ink"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;