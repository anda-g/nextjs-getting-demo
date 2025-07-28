// components/GA.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // replace with your ID

// global.d.ts
interface Window {
  gtag: (...args: any[]) => void;
}

export default function GA() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
