import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./css/one.css";
import Providers from '@/app/providers';

const ubuntuRegular = localFont({
  src: './fonts/Ubuntu-Regular.ttf',
  variable: '--font-ubuntu-regular',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'One',
  description: 'Your One and only dashboard ever needed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`ubuntu ${ubuntuRegular.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
