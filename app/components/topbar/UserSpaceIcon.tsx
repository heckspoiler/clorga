'use client';

import React, { useState, useCallback } from 'react';
import UserIcon from '../general/UserIcon';
import IconTooltip from './IconTooltip';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    setIsHovered(isHovered ? false : true);
  }, [isHovered]);

  return (
    <div className={styles.UserIconContainer} onClick={handleClick}>
      <UserIcon
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        data-tooltip-id="user-tooltip"
      />
      <IconTooltip styles={styles} isHovered={isHovered} />
    </div>
  );
}
