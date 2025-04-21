import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { getCurrentUser } from "./actions/getCurrentUser";
import NavbarWrapper from "./components/navbar/NavbarWrapper";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import SearchModal from "./components/modal/SearchModal";
import RentModal from "./components/modal/RentModal";
import { Toaster } from "react-hot-toast";

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
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper session={session}>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Toaster />
          <NavbarWrapper currentUser={currentUser} />

          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
