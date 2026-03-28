"use client";

import React, { useState } from 'react';
import { useNutriTrackData } from '@/hooks/useNutriTrackData';
import { useNavigation } from '@/hooks/useNavigation';
import { useToastNotification } from '@/hooks/useToastNotification';

import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import BottomNav from '@/components/BottomNav';
import ToastNotification from '@/components/ToastNotification';
import HomeScreen from './HomeScreen';
import LogScreen from './LogScreen';
import TodayScreen from './TodayScreen';
import FoodsScreen from './FoodsScreen';

interface MealEntryItem {
  foodId: string;
  foodName: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NutriTrackApp: React.FC = () => {
  const {
    loggedMeals,
    setLoggedMeals,
    dailyNotes,
    handleSaveDailyNote,
    generateId,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    caloriesPercent,
    proteinPercent,
    carbsPercent,
    fatPercent,
    currentFormattedDate,
    weekDays,
    GOALS,
    EMOJI_MAP,
    ALL_FOOD_DEFINITIONS,
  } = useNutriTrackData();

  const { activeScreen, setActiveScreen } = useNavigation('home');
  const { showToast, showToastMessage } = useToastNotification();

  // State for adding items to the current meal (local to NutriTrackApp for now, could be moved to LogScreen's hook)
  const [selectedMealType, setSelectedMealType] = useState<string>('Breakfast');
  const [currentMealEntries, setCurrentMealEntries] = useState<MealEntryItem[]>([]);

  const handleLogMeal = () => {
    if (currentMealEntries.length === 0) {
      alert('Please add at least one food item to log a meal.');
      return;
    }

    const totalMealCalories = currentMealEntries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalMealProtein = currentMealEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const totalMealCarbs = currentMealEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalMealFat = currentMealEntries.reduce((sum, entry) => sum + entry.fat, 0);

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const newLoggedMeal = {
      id: generateId(),
      mealType: selectedMealType,
      timestamp: time,
      entries: currentMealEntries,
      totalCalories: totalMealCalories,
      totalProtein: totalMealProtein,
      totalCarbs: totalMealCarbs,
      totalFat: totalMealFat,
    };

    setLoggedMeals((prevMeals) => [...prevMeals, newLoggedMeal]);
    showToastMessage();
    clearLogForm();
    setActiveScreen('today');
  };

  const clearLogForm = () => {
    setSelectedMealType('Breakfast');
    setCurrentMealEntries([]);
  };

  return (
    <div className="shell relative z-10 max-w-[420px] mx-auto min-h-screen flex flex-col">
      {/* Ambient Glows */}
      <div className="glow-orb glow-1"></div>
      <div className="glow-orb glow-2"></div>

      {/* Toast */}
      <ToastNotification show={showToast} message="Meal logged ✓" />

      {/* HEADER */}
      <Header />

      {/* TABS */}
      <Tabs activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* SCREENS */}
      {activeScreen === 'home' && (
        <HomeScreen
          totalCalories={totalCalories}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFat={totalFat}
          caloriesPercent={caloriesPercent}
          proteinPercent={proteinPercent}
          carbsPercent={carbsPercent}
          fatPercent={fatPercent}
          weekDays={weekDays}
          currentFormattedDate={currentFormattedDate}
          dailyNotes={dailyNotes}
          handleSaveDailyNote={handleSaveDailyNote}
          setActiveScreen={setActiveScreen}
          GOALS={GOALS}
        />
      )}
      {activeScreen === 'log' && (
        <LogScreen
          selectedMealType={selectedMealType}
          setSelectedMealType={setSelectedMealType}
          currentMealEntries={currentMealEntries}
          setCurrentMealEntries={setCurrentMealEntries}
          handleLogMeal={handleLogMeal}
          clearLogForm={clearLogForm}
          EMOJI_MAP={EMOJI_MAP}
          ALL_FOOD_DEFINITIONS={ALL_FOOD_DEFINITIONS}
        />
      )}
      {activeScreen === 'today' && (
        <TodayScreen
          totalCalories={totalCalories}
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFat={totalFat}
          loggedMeals={loggedMeals}
          setActiveScreen={setActiveScreen}
          GOALS={GOALS}
        />
      )}
      {activeScreen === 'foods' && (
        <FoodsScreen
          ALL_FOOD_DEFINITIONS={ALL_FOOD_DEFINITIONS}
        />
      )}

      {/* BOTTOM NAV */}
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default NutriTrackApp;