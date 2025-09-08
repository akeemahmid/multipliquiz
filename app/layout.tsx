import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaXTwitter } from "react-icons/fa6";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multipli quiz",
  description: "multipli quiz test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="transition-all transform ease-in-out duration-1000 delay-1200 flex-grow container mx-auto px-4 ">
          {children}
        </main>
        <div className="flex w-full items-end justify-end-safe px-8 mt-[5%]">
          <a
            href="https://x.com/haakimii__"
            className="rounded-3xl p-4 bg-gradient-to-r text-white  from-[#a66cff] to-[#3E3170] font-bold text-[16px] flex items-center gap-2"
          >
            <FaXTwitter className="text-xl" />Hakimi
          </a>
        </div>
      </body>
    </html>
  );
}
