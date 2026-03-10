import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "إنطلاق - منصة إطلاق المشاريع الناشئة",
  description: "ابنِ، أطلق، ونمِّ مشروعك مع منصتنا المتكاملة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
