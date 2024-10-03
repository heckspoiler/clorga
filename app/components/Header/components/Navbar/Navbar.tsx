import React from 'react';

import styles from './Navbar.module.css';
import Link from 'next/link';

const navbarItems = [
  { name: 'About Clorga', path: '/about' },
  { name: 'Usecases', path: '/why-clorga' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarList}>
        {navbarItems.map((item, index) => (
          <li key={index}>
            <Link href={item.path} className={styles.Link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
