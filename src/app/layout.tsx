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
