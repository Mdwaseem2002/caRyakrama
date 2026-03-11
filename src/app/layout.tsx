import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "caRyakrama",
  description: "Browse all used cars in Bengaluru",
  icons: {
    icon: "/Favicon-1.png",
    shortcut: "/Favicon-1.png",
    apple: "/Favicon-1.png",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/Connect/WhatsApp";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            {children}
            <WhatsApp />
            <Footer />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
