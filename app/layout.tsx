import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";

import Footer from "@/components/footer/Footer";
import Nav from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ChakraProvider>
        <Nav />
        <body className="pt-16">{children}</body>
        <Footer />
      </ChakraProvider>
    </html>
  );
}
