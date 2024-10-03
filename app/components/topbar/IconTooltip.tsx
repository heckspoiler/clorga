'use client';

import React, { memo, useEffect, useState } from 'react';
import SingoutButton from './SingoutButton';
import { elements } from './TooltipElements';
import { userStore } from '@/utils/userStore';

function IconTooltip({
  styles,
  isHovered,
}: {
  styles?: any;
  isHovered: boolean;
}) {
  const [userName, setUserName] = useState('');

  const name = userStore((state) => state.firstName) as string;

  useEffect(() => {
    setUserName(name);
  }, [name]);

  return (
    <div
      className={`${styles.TooltipContent} ${
        isHovered ? styles.TooltipVisible : null
      }`}
    >
      <div className={styles.TooltipLink}>
        <h4>Hey there, {userName}</h4>
      </div>
      {elements.map((element, index) => (
        <div key={index} className={styles.TooltipLink}>
          <p>{index < 9 ? '0' + (index + 1) : index + 1}</p>
          <a href={element.link}>{element.name}</a>
        </div>
      ))}
      <div className={styles.TooltipLink}>
        <SingoutButton styles={styles} />
      </div>
    </div>
  );
}

export default memo(IconTooltip);
