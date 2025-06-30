import type { Metadata } from "next";
import "./globals.css";
import NavBarComponent from "@/components/header/NavBarComponent";
import { Suspense } from "react";
import { Open_Sans } from "next/font/google";
import Loading from "./loading";
import FooterComponent from "@/components/footer/FooterComponent";

const open_sans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuika",
  description: "E-Commerce website provide more than a million of products",
  openGraph: {
    title: "Kuika",
    description: "E-Commerce website provide more than a million of products",
    url: "https://kuika.vercel.app",
    siteName: "Kuika",
    images: [
      {
        url: "https://kuika.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kuika E-Commerce",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <NavBarComponent />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <FooterComponent />
      </body>
    </html>
  );
}
