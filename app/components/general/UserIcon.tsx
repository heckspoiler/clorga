import React from 'react';

export default function UserIcon({
  width,
  height,
  strokeWidth,
}: {
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={width ?? 64}
      height={height ?? 77}
      viewBox="0 0 64 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M62.2656 69.1797V75.5H1.5V69.1797C1.5 52.3997 15.1028 38.7969 31.8828 38.7969C48.6628 38.7969 62.2656 52.3997 62.2656 69.1797Z"
        stroke="black"
        strokeWidth={strokeWidth ?? 3}
      />
      <circle
        cx="31.8828"
        cy="17.4453"
        r="15.9453"
        stroke="black"
        strokeWidth={strokeWidth ?? 3}
      />
    </svg>
  );
}
