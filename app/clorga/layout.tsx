import type { Metadata, Viewport } from 'next';
import { Space_Mono } from 'next/font/google';
import '../globals.css';
import Topbar from './components/topbar/Topbar';

const spacemono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Clorga App',
  description:
    'A productivity and project management app for organizing ideas and tasks.',
  openGraph: {
    title: 'Clorga App',
    description: 'Organize your projects and ideas effortlessly with Clorga.',
    url: '/clorga',
    siteName: 'Clorga',
    images: [
      {
        url: '/images/clorga-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Clorga app interface screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clorga App',
    description: 'Organize your projects and ideas effortlessly with Clorga.',
    images: ['/images/clorga-twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={spacemono.className}>
      <Topbar />
      <main>{children}</main>
    </section>
  );
}
