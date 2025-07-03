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
  keywords: [
    "e-commerce",
    "online shopping",
    "buy online",
    "shop online",
    "best deals",
    "discounts",
    "electronics",
    "fashion",
    "clothing",
    "shoes",
    "accessories",
    "home appliances",
    "gadgets",
    "mobile phones",
    "laptops",
    "beauty products",
    "health products",
    "toys",
    "kids products",
    "men's fashion",
    "women's fashion",
    "free shipping",
    "secure payment",
    "customer support",
    "new arrivals",
    "trending products",
    "top brands",
    "sale",
    "offers",
    "shopping website",
    "online store",
    "Kuika",
    "Kuika shop",
    "Kuika e-commerce",
  ],
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
  twitter: {
    title: "Kuika",
    description: "E-Commerce website provide more than a million of products",
    images: [
      {
        url: "https://kuika.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kuika E-Commerce",
      },
    ],
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
