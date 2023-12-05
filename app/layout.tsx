import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import type React from 'react';
import { inter, spaceGrotesk } from './font';
import './globals.css';

export const metadata:Metadata = {
  title: 'FishFlow',
  description: 'A fish flow for your fish',
  icons: {
    icon: '/public/assets/images/site-logo.svg'
  }
};

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
