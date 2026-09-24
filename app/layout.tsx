import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Last Light · Hong Kong after dark',
  description: 'A tiny adventure on the Hong Kong coast. Four places, a restless sea, and a light that stays on after dark.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
