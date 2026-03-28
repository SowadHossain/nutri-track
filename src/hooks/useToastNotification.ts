import { useState } from 'react';

export const useToastNotification = () => {
  const [showToast, setShowToast] = useState<boolean>(false);

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  return {
    showToast,
    showToastMessage,
  };
};