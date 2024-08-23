import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';

const spacemono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'OZELOT CLORGA',
  description: 'The fastest way to build apps with Next.js and Supabase',
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
