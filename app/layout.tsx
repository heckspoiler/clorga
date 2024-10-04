import type { Metadata, Viewport } from 'next';
import {
  Space_Grotesk,
  Noto_Sans,
  Azeret_Mono,
  Chivo_Mono,
  Work_Sans,
} from 'next/font/google';
import './globals.css';
import FixedBackground from './components/fixedBackground/FixedBackground';
import { Header } from './components/Header/Header';

const spacemono = Space_Grotesk({
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

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'OZELOT CLORGA',
  description: 'The fastest way to build apps with Next.js and Supabase',
  manifest: '/manifest.json',
  // icons: [
  //   { rel: 'apple-touch-icon', url: '/icon-192x192.png' },
  //   { rel: 'icon', url: '/favicon.ico' },
  // ],
};

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
    <html lang="en">
      <body className={spacemono.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
