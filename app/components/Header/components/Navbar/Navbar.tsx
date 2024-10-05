'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

const navbarItems = [
  { name: 'About Clorga', path: '/about' },
  { name: 'Usecases', path: '/why-clorga' },
  { name: 'Pricing', path: '/subscribe' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const blockRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log(index);
    const block = blockRef.current;

    if (!block) return;

    switch (index) {
      case 0:
        block.style.transform = 'translateX(0%)';
        break;
      case 1:
        block.style.transform = 'translateX(100%)';
        break;
      case 2:
        block.style.transform = 'translateX(200%)';
        break;
      case 3:
        block.style.transform = 'translateX(300%)';
        break;
      default:
        block.style.transform = 'translateX(-100%)';
        break;
    }
  }, [index]);

  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarList}>
        <div className={styles.NavbarHoverblock} ref={blockRef}></div>
        {navbarItems.map((item, index) => (
          <li
            key={index}
            onMouseOver={() => {
              setIndex(index);
            }}
            onMouseLeave={() => {
              setIndex(null);
            }}
          >
            <Link href={item.path} className={styles.Link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
