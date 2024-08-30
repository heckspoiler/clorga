import React from 'react';

const Plussign = ({ width, height }: { width: string; height: string }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="38" height="38" rx="19" fill="#FFE600" />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="19"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M18.8425 32V8H21.1575V32H18.8425ZM8 21.1664V18.8336H32V21.1664H8Z"
        fill="black"
      />
    </svg>
  );
};

export default Plussign;
