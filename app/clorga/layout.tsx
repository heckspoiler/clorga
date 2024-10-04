'use client';

import type { Metadata, Viewport } from 'next';
import {
  Space_Mono,
  Noto_Sans,
  Azeret_Mono,
  Chivo_Mono,
} from 'next/font/google';
import '../globals.css';
import Topbar from './components/topbar/Topbar';
import FixedBackground from '../components/fixedBackground/FixedBackground';

const spacemono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const azeret = Chivo_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={spacemono.className}>
      <FixedBackground />
      <Topbar />
      <main>{children}</main>
    </section>
  );
}
