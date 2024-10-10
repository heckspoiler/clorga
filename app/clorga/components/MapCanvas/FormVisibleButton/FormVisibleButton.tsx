'use client';

import React, { useEffect, useState } from 'react';

export default function FormVisibleButton({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [transition, setTransition] = useState('background-color 1s ease');

  useEffect(() => {
    const colorTimeout1 = setTimeout(() => {
      setBackgroundColor('rgba(225, 255, 18, 1)');
    }, 500);

    const colorTimeout2 = setTimeout(() => {
      setBackgroundColor('#fff');
    }, 1200);

    const transitionTimeout = setTimeout(() => {
      setTransition('');
    }, 1800);

    return () => {
      clearTimeout(colorTimeout1);
      clearTimeout(colorTimeout2);
      clearTimeout(transitionTimeout);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        style={{ backgroundColor, transition }}
      >
        {isVisible ? 'Hide Idea Form' : 'Show Idea Form'}
      </button>
    </div>
  );
}
