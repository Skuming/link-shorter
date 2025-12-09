import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import Metrika from "./components/Metrika";

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
      <body className={`${dancing.variable} antialiased bg-[#18181B]`}>
        <Metrika>{children}</Metrika>
      </body>
    </html>
  );
}
