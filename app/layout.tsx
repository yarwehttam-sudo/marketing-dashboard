import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Client Dashboard",
  description: "Marketing performance metrics",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <header className="sticky top-0 z-50 bg-gray-900 shadow-sm">
          <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold tracking-wide text-white">
              Performance Dashboard
            </span>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
