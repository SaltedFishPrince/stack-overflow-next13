import { ThemeProvider } from '@/context/theme-provider';
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
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider appearance={{
          elements: {
            formButtonPrimary: 'primary-gradient',
            footerActionLink: 'primary-text-gradient hover:text-primary-500'
          }
        }}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
