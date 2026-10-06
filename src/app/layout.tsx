import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'DEXTER - AI Research to Presentation',
  description: 'Transform research topics into professional PowerPoint presentations powered by AI',
  keywords: ['AI', 'Research', 'PowerPoint', 'Presentation', 'Generator'],
  authors: [{ name: 'DEXTER Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
