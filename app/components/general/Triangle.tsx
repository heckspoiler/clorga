import React from 'react';

const Triangle = ({
  color,
  strokeColor,
  longestStrokeColor,
  width,
  height,
  strokeWidth,
  styles,
}: {
  color?: string;
  strokeColor?: string;
  longestStrokeColor?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  styles: any;
}) => {
  return (
    <svg
      width={width ?? 145}
      height={height ?? 66}
      viewBox="0 0 145 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M143.524 0.499986L72.5 65.3231L1.4764 0.499998L143.524 0.499986Z"
        fill={color ?? 'white'}
        className={styles.Fill}
      />
      <line
        x1="1.4764"
        y1="0.499998"
        x2="72.5"
        y2="65.3231"
        stroke={strokeColor ?? 'black'}
        strokeWidth={strokeWidth ?? 1}
      />
      <line
        x1="72.5"
        y1="65.3231"
        x2="143.524"
        y2="0.499986"
        stroke={strokeColor ?? 'black'}
        strokeWidth={strokeWidth ?? 1}
      />
      <line
        x1="1.4764"
        y1="0.499998"
        x2="143.524"
        y2="0.499986"
        stroke={longestStrokeColor ?? 'white'}
        strokeWidth={strokeWidth ?? 1}
      />
    </svg>
  );
};

export default Triangle;
