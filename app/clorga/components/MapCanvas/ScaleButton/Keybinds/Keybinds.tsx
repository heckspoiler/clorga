import React from 'react';

export default function Keybinds({
  styles,
  isHovered,
}: {
  styles: any;
  isHovered: boolean;
}) {
  return (
    <div
      className={`${styles.Keybinds} ${
        isHovered ? styles.KeybindsVisible : null
      }`}
    >
      <p>
        <span>zoom:</span> z + wheel
      </p>
      <p>
        <span>pan:</span> space + mouse
      </p>
    </div>
  );
}
