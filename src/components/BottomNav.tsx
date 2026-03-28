"use client";

import React from 'react';
import { Home, PlusCircle, ClipboardList, Salad } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-ink/90 backdrop-blur-xl border-t border-line flex z-50 pb-[env(safe-area-inset-bottom,0px)]">
      <div
        className={`flex-1 py-3.5 px-2 text-center cursor-pointer text-[10px] font-bold tracking-wider uppercase text-snow-300 transition-colors duration-200 select-none ${
          activeScreen === 'home' ? 'text-lime' : ''
        }`}
        onClick={() => setActiveScreen('home')}
      >
        <Home className="block text-2xl mx-auto mb-1 h-6 w-6" />Home
      </div>
      <div
        className={`flex-1 py-3.5 px-2 text-center cursor-pointer text-[10px] font-bold tracking-wider uppercase text-snow-300 transition-colors duration-200 select-none ${
          activeScreen === 'log' ? 'text-lime' : ''
        }`}
        onClick={() => setActiveScreen('log')}
      >
        <PlusCircle className="block text-2xl mx-auto mb-1 h-6 w-6" />Log
      </div>
      <div
        className={`flex-1 py-3.5 px-2 text-center cursor-pointer text-[10px] font-bold tracking-wider uppercase text-snow-300 transition-colors duration-200 select-none ${
          activeScreen === 'today' ? 'text-lime' : ''
        }`}
        onClick={() => setActiveScreen('today')}
      >
        <ClipboardList className="block text-2xl mx-auto mb-1 h-6 w-6" />Today
      </div>
      <div
        className={`flex-1 py-3.5 px-2 text-center cursor-pointer text-[10px] font-bold tracking-wider uppercase text-snow-300 transition-colors duration-200 select-none ${
          activeScreen === 'foods' ? 'text-lime' : ''
        }`}
        onClick={() => setActiveScreen('foods')}
      >
        <Salad className="block text-2xl mx-auto mb-1 h-6 w-6" />Foods
      </div>
    </div>
  );
};

export default BottomNav;