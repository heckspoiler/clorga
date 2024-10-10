import React from 'react';

export default function FormVisibleButton({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: any;
}) {
  return (
    <div>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        Show Idea Form
      </button>
    </div>
  );
}
