import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Diner Dashboard",
  description: "Retro-neon glassmorphism diner dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased dark"
    >
      <body className="h-full bg-slate-900 text-slate-100 flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
