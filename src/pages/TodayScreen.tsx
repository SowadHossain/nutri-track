"use client";

import React from 'react';
import { LoggedMeal } from '@/hooks/useNutriTrackData'; // Assuming LoggedMeal type is exported
import { EMOJI_MAP } from '@/hooks/useNutriTrackData'; // Assuming EMOJI_MAP is exported

interface TodayScreenProps {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  loggedMeals: LoggedMeal[];
  setActiveScreen: (screen: string) => void;
  GOALS: { cal: number; pro: number; car: number; fat: number };
}

const TodayScreen: React.FC<TodayScreenProps> = ({
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  loggedMeals,
  setActiveScreen,
  GOALS,
}) => {
  return (
    <div className="flex-1 px-[18px] py-[22px] pb-[100px] overflow-y-auto">
      <div className="font-display text-3xl font-bold tracking-tighter mb-5">Today's Log</div>

      {/* Totals bar */}
      <div className="grid grid-cols-4 bg-ink-3 border border-line rounded-r mb-4 overflow-hidden">
        <div className="p-4 text-center border-r border-line">
          <div className="font-display text-2xl font-bold text-lime">{totalCalories.toLocaleString()}</div>
          <div className="text-[9px] uppercase tracking-wider text-snow-300 mt-1">kcal</div>
        </div>
        <div className="p-4 text-center border-r border-line">
          <div className="font-display text-2xl font-bold text-[#c084fc]">{totalProtein}g</div>
          <div className="text-[9px] uppercase tracking-wider text-snow-300 mt-1">protein</div>
        </div>
        <div className="p-4 text-center border-r border-line">
          <div className="font-display text-2xl font-bold text-[#38bdf8]">{totalCarbs}g</div>
          <div className="text-[9px] uppercase tracking-wider text-snow-300 mt-1">carbs</div>
        </div>
        <div className="p-4 text-center">
          <div className="font-display text-2xl font-bold text-[#fb923c]">{totalFat}g</div>
          <div className="text-[9px] uppercase tracking-wider text-snow-300 mt-1">fats</div>
        </div>
      </div>

      {/* Meals list */}
      <div className="bg-ink-2 border border-line rounded-r">
        {loggedMeals.length === 0 ? (
          <p className="text-center text-snow-300 py-4">No meals logged yet. Add some!</p>
        ) : (
          loggedMeals.map((meal, index) => (
            <div
              key={meal.id}
              className={`grid grid-cols-[44px_1fr_auto] gap-3 p-3.5 px-[18px] ${
                index < loggedMeals.length - 1 ? 'border-b border-line-2' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-ink-4 border border-line flex items-center justify-center text-2xl flex-shrink-0">
                {EMOJI_MAP[meal.mealType.toLowerCase().replace(/[^a-z]/g, '')] || '🍽️'}
              </div>
              <div>
                <div className="text-sm font-semibold text-snow">{meal.mealType} · {meal.timestamp}</div>
                <div className="text-xs text-snow-300 mt-0.5">
                  {meal.entries.map(entry => `${entry.foodName} (${entry.servings}s)`).join(', ')}
                </div>
                <div className="text-xs text-snow-300 mt-0.5">
                  P {meal.totalProtein}g · C {meal.totalCarbs}g · F {meal.totalFat}g
                </div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-lime text-right">{meal.totalCalories}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Remaining */}
      <div className="bg-gradient-to-br from-lime-dim to-cyan-dim border border-lime-dim rounded-r-sm p-4 pb-3.5 mt-3.5">
        <div className="text-[10px] uppercase tracking-wider text-lime font-bold mb-2.5">↓ Remaining to goal</div>
        <div className="grid grid-cols-4 text-center gap-1">
          <div>
            <div className="font-display text-lg font-bold text-snow">{Math.max(0, GOALS.cal - totalCalories)}</div>
            <div className="text-[9px] text-snow-300 uppercase tracking-wider mt-0.5">kcal</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-snow">{Math.max(0, GOALS.pro - totalProtein)}g</div>
            <div className="text-[9px] text-snow-300 uppercase tracking-wider mt-0.5">protein</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-snow">{Math.max(0, GOALS.car - totalCarbs)}g</div>
            <div className="text-[9px] text-snow-300 uppercase tracking-wider mt-0.5">carbs</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold text-snow">{Math.max(0, GOALS.fat - totalFat)}g</div>
            <div className="text-[9px] text-snow-300 uppercase tracking-wider mt-0.5">fats</div>
          </div>
        </div>
      </div>

      <button
        className="w-full py-4 rounded-r-sm cursor-pointer font-display text-base font-semibold tracking-tight bg-lime text-[#0a0f08] shadow-lg shadow-lime-glow/25 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-glow/35 active:translate-y-0 active:opacity-90 mt-3.5"
        onClick={() => setActiveScreen('log')}
      >
        + Add Another Meal
      </button>
    </div>
  );
};

export default TodayScreen;