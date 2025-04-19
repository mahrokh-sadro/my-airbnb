// app/layout.tsx (or RootLayout)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider directly
import { authOptions } from "./api/auth/[...nextauth]/route"; // Import authOptions
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/navbar/Navbar";
import { getCurrentUser } from "./actions/getCurrentUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "MY Airbnb",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch session from server-side using getServerSession
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper session={session}>
          <Navbar currentUser={currentUser} />

          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
