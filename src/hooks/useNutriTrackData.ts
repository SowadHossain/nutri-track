import { useState, useEffect, useMemo } from 'react';

export interface MealEntryItem {
  foodId: string;
  foodName: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface LoggedMeal {
  id: string;
  mealType: string;
  timestamp: string;
  entries: MealEntryItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface FoodDefinition {
  id: string;
  name: string;
  icon: string;
  calPerServing: number;
  proPerServing: number;
  carPerServing: number;
  fatPerServing: number;
  servingSize: string;
}

interface MealTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const GOALS = { cal: 2200, pro: 140, car: 220, fat: 73 };

export const EMOJI_MAP: { [key: string]: string } = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
  custom: '✏️',
};

export const ALL_FOOD_DEFINITIONS: FoodDefinition[] = [
  { id: 'chicken-breast', icon: '🍗', name: 'Chicken Breast', calPerServing: 165, proPerServing: 31, carPerServing: 0, fatPerServing: 4, servingSize: '100g' },
  { id: 'brown-rice', icon: '🍚', name: 'Brown Rice', calPerServing: 216, proPerServing: 5, carPerServing: 45, fatPerServing: 2, servingSize: '1 cup cooked' },
  { id: 'whey-protein', icon: '💪', name: 'Whey Protein Shake', calPerServing: 130, proPerServing: 25, carPerServing: 4, fatPerServing: 2, servingSize: '1 scoop' },
  { id: 'greek-yogurt', icon: '🥛', name: 'Greek Yogurt', calPerServing: 100, proPerServing: 17, carPerServing: 6, fatPerServing: 0, servingSize: '100g' },
  { id: 'salmon-fillet', icon: '🐟', name: 'Salmon Fillet', calPerServing: 208, proPerServing: 20, carPerServing: 0, fatPerServing: 13, servingSize: '100g' },
  { id: 'avocado-half', icon: '🥑', name: 'Avocado ½', calPerServing: 160, proPerServing: 2, carPerServing: 9, fatPerServing: 15, servingSize: '½ avocado' },
  { id: 'eggs-x2', icon: '🥚', name: 'Eggs ×2', calPerServing: 140, proPerServing: 12, carPerServing: 1, fatPerServing: 10, servingSize: '2 large eggs' },
  { id: 'oats-80g', icon: '🌾', name: 'Oats 80g', calPerServing: 300, proPerServing: 10, carPerServing: 54, fatPerServing: 6, servingSize: '80g dry' },
  { id: 'broccoli', icon: '🥦', name: 'Broccoli', calPerServing: 55, proPerServing: 4, carPerServing: 11, fatPerServing: 1, servingSize: '1 cup chopped' },
  { id: 'blueberries', icon: '🫐', name: 'Blueberries', calPerServing: 57, proPerServing: 1, carPerServing: 14, fatPerServing: 0, servingSize: '1 cup' },
  { id: 'peanut-butter', icon: '🥜', name: 'Peanut Butter', calPerServing: 188, proPerServing: 8, carPerServing: 6, fatPerServing: 16, servingSize: '2 tbsp' },
  { id: 'banana', icon: '🍌', name: 'Banana', calPerServing: 89, proPerServing: 1, carPerServing: 23, fatPerServing: 0, servingSize: '1 medium' },
];

export const useNutriTrackData = () => {
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [dailyNotes, setDailyNotes] = useState<{ [date: string]: string }>({});

  useEffect(() => {
    const storedMeals = localStorage.getItem('nutriTrackLoggedMeals');
    if (storedMeals) {
      setLoggedMeals(JSON.parse(storedMeals));
    }
    const storedDailyNotes = localStorage.getItem('nutriTrackDailyNotes');
    if (storedDailyNotes) {
      setDailyNotes(JSON.parse(storedDailyNotes));
    }
  }, []);

  // Seed lightweight mock data if nothing is stored yet
  useEffect(() => {
    const storedMeals = localStorage.getItem('nutriTrackLoggedMeals');
    const storedDailyNotes = localStorage.getItem('nutriTrackDailyNotes');
    if (!storedMeals) {
      const mockMeals: LoggedMeal[] = [
        {
          id: 'mock-1',
          mealType: 'Breakfast',
          timestamp: '08:00 AM',
          entries: [
            { foodId: 'oats-80g', foodName: 'Oats', servings: 1, calories: 300, protein: 10, carbs: 54, fat: 6 },
          ],
          totalCalories: 300,
          totalProtein: 10,
          totalCarbs: 54,
          totalFat: 6,
        },
        {
          id: 'mock-2',
          mealType: 'Lunch',
          timestamp: '12:00 PM',
          entries: [
            { foodId: 'chicken-breast', foodName: 'Chicken', servings: 1, calories: 165, protein: 31, carbs: 0, fat: 4 },
          ],
          totalCalories: 165,
          totalProtein: 31,
          totalCarbs: 0,
          totalFat: 4,
        },
      ];

      setLoggedMeals(mockMeals);
      localStorage.setItem('nutriTrackLoggedMeals', JSON.stringify(mockMeals));
    }

    if (!storedDailyNotes) {
      const mockNotes: { [date: string]: string } = {
        [currentFormattedDate]: 'This is mock data.'
      };
      setDailyNotes(mockNotes);
      localStorage.setItem('nutriTrackDailyNotes', JSON.stringify(mockNotes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('nutriTrackLoggedMeals', JSON.stringify(loggedMeals));
  }, [loggedMeals]);

  useEffect(() => {
    localStorage.setItem('nutriTrackDailyNotes', JSON.stringify(dailyNotes));
  }, [dailyNotes]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const calculateOverallTotals = (meals: LoggedMeal[]): MealTotals => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.totalCalories,
        protein: acc.protein + meal.totalProtein,
        carbs: acc.carbs + meal.totalCarbs,
        fat: acc.fat + meal.totalFat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fat: totalFat } = calculateOverallTotals(loggedMeals);

  const getMacroPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min(100, (current / goal) * 100);
  };

  const proteinPercent = getMacroPercentage(totalProtein, GOALS.pro);
  const carbsPercent = getMacroPercentage(totalCarbs, GOALS.car);
  const fatPercent = getMacroPercentage(totalFat, GOALS.fat);
  const caloriesPercent = getMacroPercentage(totalCalories, GOALS.cal);

  const getFormattedDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const today = new Date();
  const currentFormattedDate = getFormattedDate(today);

  const handleSaveDailyNote = (noteContent: string) => {
    setDailyNotes(prevNotes => ({
      ...prevNotes,
      [currentFormattedDate]: noteContent,
    }));
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return days[date.getDay()];
  };

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - today.getDay() + i); // Start from Sunday
      const dayLabel = getDayOfWeek(d);
      const isToday = d.toDateString() === today.toDateString();
      const isCompliant = i % 2 === 0; // Placeholder logic
      return {
        label: dayLabel,
        icon: isToday ? '⚡' : (isCompliant ? '✓' : '✗'),
        isToday,
        isCompliant,
      };
    });
  }, [today]);

  return {
    loggedMeals,
    setLoggedMeals,
    dailyNotes,
    handleSaveDailyNote,
    generateId,
    calculateOverallTotals,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    getMacroPercentage,
    proteinPercent,
    carbsPercent,
    fatPercent,
    caloriesPercent,
    getFormattedDate,
    currentFormattedDate,
    getDayOfWeek,
    weekDays,
    GOALS,
    EMOJI_MAP,
    ALL_FOOD_DEFINITIONS,
  };
};