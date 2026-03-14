import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI疗愈助手",
  description: "帮你疏导焦虑、缓解空虚感的AI陪伴",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
