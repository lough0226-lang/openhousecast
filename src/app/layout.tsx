import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'OpenHouseCast — AI YouTube Scripts Built for Real Estate',
    template: '%s · OpenHouseCast',
  },
  description:
    'OpenHouseCast turns your market data and local expertise into long-form YouTube scripts real estate buyers and sellers actually watch — with real-estate-specific structure, retention hooks, and Fair Housing-safe guardrails built in.',
  keywords: [
    'real estate youtube',
    'ai long-form script generator',
    'real estate agent content',
    'market update video',
    'buyer education video',
    'seller education video',
    'youtube long form video',
    'fair housing compliant scripts',
  ],
  openGraph: {
    title: 'OpenHouseCast — AI YouTube Scripts Built for Real Estate',
    description:
      'Write better long-form video scripts for your market faster. Real-estate-specific frameworks, retention hooks, shot lists, and compliance guardrails.',
    type: 'website',
    siteName: 'OpenHouseCast',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenHouseCast — AI YouTube Scripts Built for Real Estate',
    description:
      'Write better long-form video scripts for your market faster.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}