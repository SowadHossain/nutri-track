"use client";

import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { FoodDefinition } from '@/hooks/useNutriTrackData'; // Assuming FoodDefinition type is exported

interface FoodsScreenProps {
  ALL_FOOD_DEFINITIONS: FoodDefinition[];
}

const FoodsScreen: React.FC<FoodsScreenProps> = ({ ALL_FOOD_DEFINITIONS }) => {
  return (
    <div className="flex-1 px-[18px] py-[22px] pb-[100px] overflow-y-auto">
      <div className="font-display text-3xl font-bold tracking-tighter mb-5">Food List</div>

      <div className="bg-ink-2 border border-line rounded-r mb-4">
        <div className="mx-[18px] my-3.5 py-3 px-3.5 rounded-r-sm bg-cyan-dim border border-cyan-dim text-xs text-cyan font-medium flex items-center gap-2">
          <MessageSquareText className="h-4 w-4" />
          <span>This list is managed by your coach. Reach out to request changes.</span>
        </div>

        <div className="food-table">
          <div className="grid grid-cols-[1fr_52px_52px_52px_52px] gap-1 px-[18px] py-2.5 text-[9px] font-bold uppercase tracking-wider text-snow-300 border-b border-line">
            <div>Item</div>
            <div className="text-center">kcal</div>
            <div className="text-center">prot</div>
            <div className="text-center">carb</div>
            <div className="text-center">fat</div>
          </div>
          {ALL_FOOD_DEFINITIONS.map((food, index) => (
            <div
              key={food.id}
              className={`grid grid-cols-[1fr_52px_52px_52px_52px] gap-1 px-[18px] py-3.5 items-center transition-colors duration-150 ${
                index < ALL_FOOD_DEFINITIONS.length - 1 ? 'border-b border-line-2' : ''
              } hover:bg-white/5`}
            >
              <div className="text-sm font-medium text-snow">{food.icon} {food.name}</div>
              <div className="text-center font-display text-base font-semibold text-lime">{food.calPerServing}</div>
              <div className="text-center font-display text-base font-semibold text-[#c084fc]">{food.proPerServing}g</div>
              <div className="text-center font-display text-base font-semibold text-[#38bdf8]">{food.carPerServing}g</div>
              <div className="text-center font-display text-base font-semibold text-[#fb923c]">{food.fatPerServing}g</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-1.5 pb-2">
        <div className="text-xs text-snow-300 mb-2">Need to add or edit foods?</div>
        <button className="w-full py-3.5 bg-ink-3 text-cyan shadow-none border border-cyan-dim rounded-r-sm font-display text-sm font-semibold">
          Message Coach →
        </button>
      </div>
    </div>
  );
};

export default FoodsScreen;