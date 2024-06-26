import './globals.css';

import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

import Footer from '@/components/footer/index';
import Nav from '@/components/header/Header';

import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Smart Data Entry',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Smart Data Entry</title>
      </head>
      <body className="pt-16">
        <Providers>
          <NextTopLoader crawl={true} easing="ease" />
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
