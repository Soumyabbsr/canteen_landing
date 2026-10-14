import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const viewport: Viewport = {
  themeColor: "#FF6B35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "MBBS Canteen — Your Canteen, Just a Tap Away",
  description:
    "Explore the menu and order your favourite canteen meals with ease. Download the MBBS Canteen Android app.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "MBBS Canteen — Your Canteen, Just a Tap Away",
    description:
      "Explore the menu and order your favourite canteen meals with ease. Download the MBBS Canteen Android app.",
    siteName: "MBBS Canteen",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 1024,
        alt: "MBBS Canteen Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className}>{children}</body>
    </html>
  );
}
