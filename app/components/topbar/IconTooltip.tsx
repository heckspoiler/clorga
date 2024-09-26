import React from 'react';
import SingoutButton from './SingoutButton';

const elements = [
  { name: 'Dashboard', link: '/dashboard' },
  { name: 'Projects', link: '/projects' },
  { name: 'Team', link: '/team' },
  { name: 'Analytics', link: '/analytics' },
  { name: 'Calendar', link: '/calendar' },
  { name: 'Messages', link: '/messages' },
  { name: 'Documents', link: '/documents' },
  { name: 'Tasks', link: '/tasks' },
  { name: 'Settings', link: '/settings' },
  { name: 'Help Center', link: '/help' },
];

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
      <div className={styles.TooltipLink}>
        <h4>Welcome, User</h4>
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
