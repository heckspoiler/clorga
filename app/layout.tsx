import type { Metadata, Viewport } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';
import { GeistMono } from 'geist/font/mono';

const spacemono = Space_Mono({
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
        <main>{children}</main>
      </body>
    </html>
  );
}
