import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const satoshi = localFont({
  display: 'swap',
  src: '../../public/fonts/satoshi.ttf',
  variable: '--font-satoshi',
});

export const metadata: Metadata = {
  title: "Stack Overflow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} font-satoshi antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
