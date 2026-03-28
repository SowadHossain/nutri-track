"use client";

import React from 'react';
import { Home, PlusCircle, ClipboardList, Salad } from 'lucide-react';

interface TabsProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className="sticky top-[61px] z-40 flex bg-ink-2 border-b border-line">
      <div
        className={`flex-1 py-[11px] px-1 text-center cursor-pointer text-[10px] font-semibold tracking-wider uppercase text-snow-300 border-b-2 border-transparent transition-colors duration-200 select-none ${
          activeScreen === 'home' ? 'text-lime border-lime' : ''
        }`}
        onClick={() => setActiveScreen('home')}
      >
        <Home className="block text-xl mx-auto mb-[3px] h-6 w-6" />Home
      </div>
      <div
        className={`flex-1 py-[11px] px-1 text-center cursor-pointer text-[10px] font-semibold tracking-wider uppercase text-snow-300 border-b-2 border-transparent transition-colors duration-200 select-none ${
          activeScreen === 'log' ? 'text-lime border-lime' : ''
        }`}
        onClick={() => setActiveScreen('log')}
      >
        <PlusCircle className="block text-xl mx-auto mb-[3px] h-6 w-6" />Log
      </div>
      <div
        className={`flex-1 py-[11px] px-1 text-center cursor-pointer text-[10px] font-semibold tracking-wider uppercase text-snow-300 border-b-2 border-transparent transition-colors duration-200 select-none ${
          activeScreen === 'today' ? 'text-lime border-lime' : ''
        }`}
        onClick={() => setActiveScreen('today')}
      >
        <ClipboardList className="block text-xl mx-auto mb-[3px] h-6 w-6" />Today
      </div>
      <div
        className={`flex-1 py-[11px] px-1 text-center cursor-pointer text-[10px] font-semibold tracking-wider uppercase text-snow-300 border-b-2 border-transparent transition-colors duration-200 select-none ${
          activeScreen === 'foods' ? 'text-lime border-lime' : ''
        }`}
        onClick={() => setActiveScreen('foods')}
      >
        <Salad className="block text-xl mx-auto mb-[3px] h-6 w-6" />Foods
      </div>
    </div>
  );
};

export default Tabs;