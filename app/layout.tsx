import type { Metadata } from "next";
import type { Viewport } from "next";

import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

import { NavbarNX } from "@/components/navbar";
import { Footbar } from "@/components/footbar";

export const metadata: Metadata = {
  description: `Yorwor Market - Hatyaiwittayalai School`,
  keywords: `Yorwor Market`,
  openGraph: {
    url: "https://market.yorwor.siraphop.me/",
    description: `Yorwor Market - Hatyaiwittayalai School`,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2d76ff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <NextTopLoader showSpinner={false} showAtBottom={true} color="#ef4444" height={4} />
        <NavbarNX />
        {children}
        <Footbar />
      </body>
    </html>
  );
}
