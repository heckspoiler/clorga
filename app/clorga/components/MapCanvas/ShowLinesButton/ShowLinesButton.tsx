import React from 'react';

export default function ShowLinesButton({
  styles,
  setShowLines,
  showLines,
}: {
  styles: any;
  setShowLines: any;
  showLines: boolean;
}) {
  return (
    <button onClick={() => setShowLines(!showLines)}>
      {showLines ? 'Hide' : 'Show'} Lines
    </button>
  );
}
