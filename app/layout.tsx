import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "NtGrd - shorten your link",
  description: "Shorten your link with NtGrd by NetGuard team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="metrika-counter" strategy="afterInteractive">
        {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(105712863, "init", {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
      </Script>
      <body className={`${dancing.variable} antialiased bg-[#18181B]`}>
        {children}
      </body>
    </html>
  );
}
