import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google';
import type React from 'react';
import './globals.css';

export const metadata:Metadata = {
  title: 'FishFlow',
  description: 'A fish flow for your fish',
  icons: {
    icon: '/public/assets/images/site-logo.svg'
  }
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
});
export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <h1 className='h1-bold'>fish</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
