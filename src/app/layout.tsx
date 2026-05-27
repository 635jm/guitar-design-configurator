import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guitar Design Configurator",
  description: "Create, configure, and summarize custom guitar design projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f5f5f7] text-zinc-950">{children}</body>
    </html>
  );
}
