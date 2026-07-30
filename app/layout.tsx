import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'VIVEK VIJAY AND COMPANY | Engineering Contractors Tamil Nadu',
    template: '%s | VIVEK VIJAY AND COMPANY',
  },
  description: 'Vivek Vijay and Company — Tamil Nadu\'s premier engineering contractor since 2007. Specialists in hospitals, commercial buildings, institutional projects, roads, bridges and more. Trusted by government and private clients across Tamil Nadu.',
  keywords: ['engineering contractor Tamil Nadu', 'construction company Erode', 'civil contractor Tamil Nadu', 'government construction projects', 'Vivek Vijay and Company'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable}`}>
      <body>
        <link rel="preload" as="image" href="/images/video%20imatge%20for%20hero%20seciton.png" />
        {children}
      </body>
    </html>
  );
}
