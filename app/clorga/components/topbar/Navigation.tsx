import React from 'react';
import Link from 'next/link';

export default function Navigation({ styles }: { styles: any }) {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarItems}>
        <li>
          <Link href="/clorga">Your Clorga</Link>
        </li>
        <li>
          <Link href="/clorga/overview">Overview</Link>
        </li>
        <li>
          <Link href="">That</Link>
        </li>
        <li>
          <Link href="">Thut</Link>
        </li>
      </ul>
    </nav>
  );
}
