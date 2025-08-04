import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Redux/provider";

import { ThemeProvider } from "next-themes";
import DarkModeToggle from "@/components/darkMood/DarkMoodToggle";

import Providers from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutorLink",
  description: "Providing a platform for tutors and students to connect",
  icons: {
    icon: "https://i.ibb.co.com/FqcCMRkT/logo.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased  transition-colors duration-300 dark:bg-gray-900 `}
      >
        <Toaster position="top-right" />
        <Providers>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <DarkModeToggle />
            </ThemeProvider>
          </ReduxProvider>
        </Providers>
        {/* <Toaster position="top-right" />
        <Providers>
          <ReduxProvider>{children}</ReduxProvider>
        </Providers> */}
      </body>
    </html>
  );
}
