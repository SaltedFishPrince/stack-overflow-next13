import { ThemeProvider } from '@/context/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import type React from 'react';
import { inter, spaceGrotesk } from './font';
import './globals.css';
import '../styles/prism.css'
import { cookies } from 'next/headers';
export const metadata: Metadata = {
  title: 'FishFlow',
  description: 'A fish flow for your fish',
  icons: {
    icon: '/public/assets/images/site-logo.svg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = cookies().get('theme')?.value ?? 'dark'
  return (
    <html lang="en" className={`${theme}`}>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider appearance={{
          elements: {
            formButtonPrimary: 'primary-gradient',
            footerActionLink: 'primary-text-gradient hover:text-primary-500'
          }
        }}>

          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
