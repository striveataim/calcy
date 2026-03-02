import { ReactNode } from 'react';
import RootLayoutClient from '@/components/RootLayoutClient';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calcy — CGPA, SGPA & Percentage Calculator | All Indian Universities</title>
        <meta
          name="description"
          content="Free CGPA to percentage calculator for VTU, SPPU, Anna University, Mumbai University, Delhi University, Chandigarh University, Manipal & HEC Pakistan. SGPA converter, semester GPA calculator."
        />
        <meta
          name="keywords"
          content="cgpa to percentage, cgpa calculator, sgpa to percentage, vtu cgpa calculator, anna university cgpa, sgpa to cgpa"
        />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
