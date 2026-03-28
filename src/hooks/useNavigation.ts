import { useState } from 'react';

export const useNavigation = (initialScreen: string) => {
  const [activeScreen, setActiveScreen] = useState<string>(initialScreen);

  return {
    activeScreen,
    setActiveScreen,
  };
};