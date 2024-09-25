import React from 'react';

export default function IconTooltip({
  styles,
  isHovered,
}: {
  styles?: any;
  isHovered: boolean;
}) {
  return (
    <div
      className={`${styles.TooltipContent} ${
        isHovered ? styles.TooltipVisible : null
      }`}
    >
      <p>Dashboard</p>
      <p>Company Space</p>
      <button>Log Out</button>
    </div>
  );
}
