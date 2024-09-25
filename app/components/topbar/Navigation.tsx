import React from 'react';

export default function Navigation({ styles }: { styles: any }) {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarItems}>
        <li>
          <a href="">Documents</a>
        </li>
        <li>
          <a href="">This</a>
        </li>
        <li>
          <a href="">That</a>
        </li>
        <li>
          <a href="">Thut</a>
        </li>
      </ul>
    </nav>
  );
}
