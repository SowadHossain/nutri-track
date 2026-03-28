"use client";

import React from 'react';
import ArcProgress from '@/components/ArcProgress';
import { Check, X, Zap } from 'lucide-react';

interface HomeScreenProps {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  caloriesPercent: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  weekDays: { label: string; icon: string | React.ReactNode; isToday: boolean; isCompliant: boolean; }[];
  currentFormattedDate: string;
  dailyNotes: { [date: string]: string };
  handleSaveDailyNote: (noteContent: string) => void;
  setActiveScreen: (screen: string) => void;
  GOALS: { cal: number; pro: number; car: number; fat: number };
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  caloriesPercent,
  proteinPercent,
  carbsPercent,
  fatPercent,
  weekDays,
  currentFormattedDate,
  dailyNotes,
  handleSaveDailyNote,
  setActiveScreen,
  GOALS,
}) => {
  return (
    <div className="flex-1 px-[18px] py-[22px] pb-[100px] overflow-y-auto">
      {/* Greeting */}
      <div className="pb-5 pt-1">
        <div className="text-xs font-semibold tracking-widest uppercase text-snow-300 mb-1 flex items-center gap-2 before:content-[''] before:inline-block before:w-5 before:h-[1.5px] before:bg-snow-300">
          Saturday · March 28
        </div>
        <div className="font-display text-[38px] font-bold leading-tight tracking-[-1px] text-snow">
          Good<br />morning, <em className="text-lime not-italic">Alex.</em>
        </div>
      </div>

      {/* Status row */}
      <div className="flex gap-3 items-stretch mb-4">
        <div className="flex-1 rounded-r p-4 flex flex-col gap-1 border border-lime-dim bg-lime-dim">
          <div className="text-[10px] uppercase tracking-wider text-snow-300 font-semibold">Status</div>
          <div className="font-display text-xl font-bold text-lime">On Track</div>
          <div className="text-xs text-snow-300 mt-0.5">within 8% of target</div>
        </div>
        <div className="flex-1 rounded-r p-4 flex flex-col gap-1 border border-line bg-ink-3">
          <div className="text-[10px] uppercase tracking-wider text-snow-300 font-semibold">Streak</div>
          <div className="flex items-center gap-1 text-amber font-bold">
            🔥 <span className="font-display text-3xl leading-none">5</span>
          </div>
          <div className="text-xs text-snow-300">days compliant</div>
        </div>
      </div>

      {/* Calorie Hero */}
      <div className="p-5 pt-[22px] pb-[18px] bg-ink-3 border border-line rounded-r mb-4 relative overflow-hidden before:content-[''] before:absolute before:top-[-40px] before:right-[-40px] before:w-[180px] before:h-[180px] before:rounded-full before:bg-radial-gradient-lime-10-transparent before:pointer-events-none">
        <div className="flex justify-between items-start mb-[18px]">
          <div>
            <div className="text-xs uppercase tracking-wider text-snow-300 font-semibold">Eaten today</div>
            <div className="font-display text-6xl font-bold leading-none tracking-[-2px] text-lime">
              {totalCalories.toLocaleString()}
              <span className="text-base text-snow-300 ml-1 align-super font-normal font-sans">kcal</span>
            </div>
            <div className="text-sm text-snow-300 mt-0.5">
              🎯 <b className="text-snow font-bold">{Math.max(0, GOALS.cal - totalCalories)} kcal</b> remaining
            </div>
          </div>
          <div className="flex items-center justify-end">
            <ArcProgress percentage={caloriesPercent} />
          </div>
        </div>

        {/* Macro Bars */}
        <div className="flex flex-col gap-3">
          <div className="macro-item">
            <div className="flex justify-between items-baseline mb-1.5">
              <div className="text-xs font-semibold tracking-tight text-[#c084fc]">Protein</div>
              <div className="text-xs text-snow-300">
                <strong className="text-snow font-semibold">{totalProtein}g</strong> / {GOALS.pro}g
              </div>
            </div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#c084fc] transition-all duration-800 ease-out" style={{ width: `${proteinPercent}%` }}></div>
            </div>
          </div>
          <div className="macro-item">
            <div className="flex justify-between items-baseline mb-1.5">
              <div className="text-xs font-semibold tracking-tight text-[#38bdf8]">Carbs</div>
              <div className="text-xs text-snow-300">
                <strong className="text-snow font-semibold">{totalCarbs}g</strong> / {GOALS.car}g
              </div>
            </div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#0369a1] to-[#38bdf8] transition-all duration-800 ease-out" style={{ width: `${carbsPercent}%` }}></div>
            </div>
          </div>
          <div className="macro-item">
            <div className="flex justify-between items-baseline mb-1.5">
              <div className="text-xs font-semibold tracking-tight text-[#fb923c]">Fats</div>
              <div className="text-xs text-snow-300">
                <strong className="text-snow font-semibold">{totalFat}g</strong> / {GOALS.fat}g
              </div>
            </div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#c2410c] to-[#fb923c] transition-all duration-800 ease-out" style={{ width: `${fatPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Pill summary */}
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <div className="bg-ink-4 rounded-xl p-3 text-center border border-line">
            <div className="font-display text-2xl font-semibold text-[#c084fc]">{totalProtein}g</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">Protein</div>
          </div>
          <div className="bg-ink-4 rounded-xl p-3 text-center border border-line">
            <div className="font-display text-2xl font-semibold text-[#38bdf8]">{totalCarbs}g</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">Carbs</div>
          </div>
          <div className="bg-ink-4 rounded-xl p-3 text-center border border-line">
            <div className="font-display text-2xl font-semibold text-[#fb923c]">{totalFat}g</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">Fats</div>
          </div>
        </div>
      </div>

      {/* Weekly strip */}
      <div className="bg-ink-2 border border-line rounded-r mb-4 overflow-hidden">
        <div className="p-5">
          <div className="text-xs uppercase tracking-wider text-snow-300 font-semibold mb-3">This week</div>
          <div className="flex gap-1.5">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`flex-1 rounded-xl p-2 pb-1.5 text-center border bg-ink-4 ${
                  day.isToday ? 'border-lime-600 shadow-lime-glow' : (day.isCompliant ? 'border-lime-dim bg-lime-dim' : 'border-rose-dim bg-rose-dim')
                }`}
              >
                <div className="text-[9px] font-bold tracking-wider uppercase text-snow-300">{day.label}</div>
                <span className={`block text-base mt-1.5 mb-0.5 ${day.isToday ? 'text-lime' : (day.isCompliant ? 'text-lime' : 'text-rose')}`}>
                  {day.icon === '⚡' && <Zap className="h-4 w-4 mx-auto" />}
                  {day.icon === '✓' && <Check className="h-4 w-4 mx-auto" />}
                  {day.icon === '✗' && <X className="h-4 w-4 mx-auto" />}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3.5">
            <div className="text-xs text-snow-300">5 of 7 days compliant</div>
            <div className="text-xs font-bold text-lime">71% ↑</div>
          </div>
        </div>
      </div>

      {/* Daily Note Card */}
      <div className="bg-ink-2 border border-line rounded-r mb-4 overflow-hidden">
        <div className="p-5">
          <div className="text-xs uppercase tracking-wider text-snow-300 font-semibold mb-3">Daily Note for {currentFormattedDate}</div>
          <textarea
            className="w-full p-3 bg-ink-3 border border-line rounded-r-sm text-snow text-sm font-sans outline-none transition-all duration-200 focus:border-lime-500 focus:shadow-outline-lime-80 appearance-none min-h-[80px]"
            placeholder="Add notes about your day, challenges, or achievements..."
            value={dailyNotes[currentFormattedDate] || ''}
            onChange={(e) => handleSaveDailyNote(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button
        className="w-full py-4 rounded-r-sm cursor-pointer font-display text-base font-semibold tracking-tight bg-lime text-[#0a0f08] shadow-lg shadow-lime-glow/25 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-glow/35 active:translate-y-0 active:opacity-90 mt-1.5"
        onClick={() => setActiveScreen('log')}
      >
        + Log a Meal
      </button>
    </div>
  );
};

export default HomeScreen;