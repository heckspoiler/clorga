'use client';

import React, { useState, useEffect } from 'react';
import UserIcon from '../UserIcon';
import TopbarTooltip from './Tooltip';

export default function UserSpaceIcon({
  styles,
  width,
  height,
  strokeWidth,
}: {
  styles: any;
  width?: number;
  height?: number | undefined;
  strokeWidth?: number | undefined;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked((prevState) => !prevState);
  };

  return (
    <div className={styles.UserIconContainer}>
      <div onClick={handleClick}>
        <UserIcon
          width={width}
          height={height}
          strokeWidth={strokeWidth}
          data-tooltip-id="user-tooltip"
        />
      </div>
      {isClicked && <TopbarTooltip styles={styles} isClicked={isClicked} />}
    </div>
  );
}
