"use client";

import React from 'react';

interface ToastNotificationProps {
  show: boolean;
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ show, message }) => {
  return (
    <div
      className={`fixed top-[78px] left-1/2 -translate-x-1/2 bg-lime-95 text-ink-900 py-[11px] px-[22px] rounded-full font-display text-sm font-bold shadow-lg shadow-lime-glow transition-all duration-200 ease-in-out whitespace-nowrap z-200 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;