import React from 'react';
import GlobalState from '@/context';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Dev from '@/components/Dev';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VGO Holdings',
  description: 'Great online shopping experience!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add your link tag for stylesheets here */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-...."
          crossOrigin="anonymous"
        />
        {/* Add any other head elements that are necessary for your app */}
      </head>
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex min-h-screen flex-col mt-[80px]">{children}</main>
          <Footer />
          <Dev />
        </GlobalState>
        {/* Any scripts or other body elements can be added here */}
      </body>
    </html>
  );
}
