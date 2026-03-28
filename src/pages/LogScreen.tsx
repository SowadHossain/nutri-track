"use client";

import React, { useState, useRef, useMemo } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface MealEntryItem {
  foodId: string;
  foodName: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodDefinition {
  id: string;
  name: string;
  icon: string;
  calPerServing: number;
  proPerServing: number;
  carPerServing: number;
  fatPerServing: number;
  servingSize: string;
}

interface MealPreviewTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface LogScreenProps {
  selectedMealType: string;
  setSelectedMealType: (type: string) => void;
  currentMealEntries: MealEntryItem[];
  setCurrentMealEntries: React.Dispatch<React.SetStateAction<MealEntryItem[]>>;
  handleLogMeal: () => void;
  clearLogForm: () => void;
  EMOJI_MAP: { [key: string]: string };
  ALL_FOOD_DEFINITIONS: FoodDefinition[];
}

const LogScreen: React.FC<LogScreenProps> = ({
  selectedMealType,
  setSelectedMealType,
  currentMealEntries,
  setCurrentMealEntries,
  handleLogMeal,
  clearLogForm,
  EMOJI_MAP,
  ALL_FOOD_DEFINITIONS,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFoodDefinition, setSelectedFoodDefinition] = useState<FoodDefinition | null>(null);
  const [servingsInput, setServingsInput] = useState<number | ''>(1);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleAddFoodToCurrentMeal = () => {
    if (!selectedFoodDefinition || servingsInput === '' || Number(servingsInput) <= 0) {
      alert('Please select a food and enter a valid number of servings.');
      return;
    }

    const servings = Number(servingsInput);
    const newEntry: MealEntryItem = {
      foodId: selectedFoodDefinition.id,
      foodName: selectedFoodDefinition.name,
      servings: servings,
      calories: selectedFoodDefinition.calPerServing * servings,
      protein: selectedFoodDefinition.proPerServing * servings,
      carbs: selectedFoodDefinition.carPerServing * servings,
      fat: selectedFoodDefinition.fatPerServing * servings,
    };

    setCurrentMealEntries((prevEntries) => [...prevEntries, newEntry]);
    setSearchTerm('');
    setSelectedFoodDefinition(null);
    setServingsInput(1);
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  const handleRemoveFoodFromCurrentMeal = (index: number) => {
    setCurrentMealEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  const filteredFoodSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    return ALL_FOOD_DEFINITIONS.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit suggestions
  }, [searchTerm]);

  const currentMealPreviewTotals = useMemo(() => {
    return currentMealEntries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fat: acc.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [currentMealEntries]);

  return (
    <div className="flex-1 px-[18px] py-[22px] pb-[100px] overflow-y-auto">
      <div className="font-display text-3xl font-bold tracking-tighter mb-5">Log Meal</div>

      {/* Meal type */}
      <div className="flex gap-2 flex-wrap mb-[22px]">
        {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Custom'].map((meal) => (
          <div
            key={meal}
            className={`py-2.5 px-4 rounded-full border border-line bg-ink-3 text-sm font-medium text-snow-300 cursor-pointer transition-all duration-150 select-none ${
              selectedMealType === meal ? 'border-lime bg-lime-dim text-lime font-semibold' : 'hover:border-lime-dim hover:text-lime'
            }`}
            onClick={() => setSelectedMealType(meal)}
          >
            {EMOJI_MAP[meal.toLowerCase().replace(/[^a-z]/g, '')] || '🍽️'} {meal}
          </div>
        ))}
      </div>

      {/* Add Food Item Section */}
      <div className="bg-ink-2 border border-line rounded-r mb-4 p-5">
        <div className="text-[10px] font-bold tracking-wider uppercase text-snow-300 mb-2.5">Add Food Item</div>
        <div className="relative mb-4">
          <label className="block text-[10px] font-bold tracking-wider uppercase text-snow-300 mb-1.5">Food Name</label>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a food..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedFoodDefinition(null); // Clear selection on search change
            }}
            className="w-full py-3.5 px-4 bg-ink-3 border border-line rounded-r-sm text-snow text-base font-sans outline-none transition-all duration-200 focus:border-lime-500 focus:shadow-outline-lime-80 appearance-none"
          />
          {searchTerm && filteredFoodSuggestions.length > 0 && !selectedFoodDefinition && (
            <div className="absolute z-10 w-full bg-ink-3 border border-line rounded-r-sm mt-1 max-h-48 overflow-y-auto">
              {filteredFoodSuggestions.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center gap-2 p-3.5 cursor-pointer hover:bg-ink-4 transition-colors duration-150 border-b border-line-2 last:border-b-0"
                  onClick={() => {
                    setSelectedFoodDefinition(food);
                    setSearchTerm(food.name);
                    setServingsInput(1); // Reset servings to 1
                  }}
                >
                  <span className="text-xl">{food.icon}</span>
                  <span className="text-sm text-snow">{food.name}</span>
                  <span className="text-xs text-snow-300 ml-auto">({food.servingSize})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedFoodDefinition && (
          <div className="mb-4">
            <label className="block text-[10px] font-bold tracking-wider uppercase text-snow-300 mb-1.5">Servings ({selectedFoodDefinition.servingSize})</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="1"
              value={servingsInput}
              onChange={(e) => setServingsInput(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full py-3.5 px-4 bg-ink-3 border border-line rounded-r-sm text-snow font-display text-xl outline-none transition-all duration-200 focus:border-lime-500 focus:shadow-outline-lime-80 appearance-none"
            />
          </div>
        )}

        <button
          className="w-full py-3.5 rounded-r-sm cursor-pointer font-display text-base font-semibold tracking-tight bg-cyan text-[#0a0f08] shadow-lg shadow-cyan/25 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan/35 active:translate-y-0 active:opacity-90"
          onClick={handleAddFoodToCurrentMeal}
          disabled={!selectedFoodDefinition || servingsInput === '' || Number(servingsInput) <= 0}
        >
          <PlusCircle className="inline-block mr-2 h-4 w-4" /> Add to Meal
        </button>
      </div>

      {/* Current Meal Items List */}
      {currentMealEntries.length > 0 && (
        <div className="bg-ink-2 border border-line rounded-r mb-4 p-5">
          <div className="text-[10px] font-bold tracking-wider uppercase text-snow-300 mb-2.5">Current Meal Items</div>
          {currentMealEntries.map((entry, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-line-2 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">{ALL_FOOD_DEFINITIONS.find(f => f.id === entry.foodId)?.icon}</span>
                <span className="text-sm text-snow">{entry.foodName} ({entry.servings} servings)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-lime">{entry.calories} kcal</span>
                <button onClick={() => handleRemoveFoodFromCurrentMeal(index)} className="text-rose hover:text-rose-dim">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live preview */}
      <div
        className={`bg-ink-3 border border-line rounded-r-sm p-4 pb-3.5 mb-4 transition-colors duration-200 ${
          currentMealEntries.length > 0 ? 'border-lime-dim' : ''
        }`}
      >
        <div className="text-[10px] font-bold tracking-wider uppercase text-snow-300 mb-2.5">Meal Preview</div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-lime">{currentMealPreviewTotals.calories || '—'}</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">kcal</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#c084fc]">{currentMealPreviewTotals.protein || '—'}</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">protein</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#38bdf8]">{currentMealPreviewTotals.carbs || '—'}</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">carbs</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#fb923c]">{currentMealPreviewTotals.fat || '—'}</div>
            <div className="text-[10px] text-snow-300 mt-0.5 uppercase tracking-wider">fats</div>
          </div>
        </div>
      </div>

      <button
        className="w-full py-4 rounded-r-sm cursor-pointer font-display text-base font-semibold tracking-tight bg-lime text-[#0a0f08] shadow-lg shadow-lime-glow/25 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-glow/35 active:translate-y-0 active:opacity-90 mt-1.5"
        onClick={handleLogMeal}
        disabled={currentMealEntries.length === 0}
      >
        ✓ &nbsp;Log Meal
      </button>
      <button
        className="w-full py-3.5 border border-line rounded-r-sm cursor-pointer font-display text-base font-semibold bg-transparent text-snow-200 mt-2.5 transition-colors duration-150 hover:border-line-2 hover:text-snow"
        onClick={clearLogForm}
      >
        Clear form
      </button>
    </div>
  );
};

export default LogScreen;