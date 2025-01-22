import type { Metadata } from "next";
import type { Viewport } from "next";

import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

import { NavbarNX } from "@/components/navbar";
import { Footbar } from "@/components/footbar";

export const metadata: Metadata = {
  description: `Yorwor Market คือเว็บไซต์ซื้อขายสินค้าที่ออกแบบมาโดยเฉพาะสำหรับนักเรียนและบุคลากรโรงเรียนหาดใหญ่วิทยาลัย เรามุ่งเน้นการสร้างแพลตฟอร์มที่ใช้งานง่าย ปลอดภัย และสะดวกสบาย เพื่อสนับสนุนการซื้อขายภายในชุมชนโรงเรียน`,
  keywords: `Yorwor Market,ญว Market,YW Market,yw market,ญ.ว. Market,ญ.ว. มาร์เก็ต`,
  openGraph: {
    url: "https://market.yorwor.siraphop.me/",
    description: `Yorwor Market คือเว็บไซต์ซื้อขายสินค้าที่ออกแบบมาโดยเฉพาะสำหรับนักเรียนและบุคลากรโรงเรียนหาดใหญ่วิทยาลัย เรามุ่งเน้นการสร้างแพลตฟอร์มที่ใช้งานง่าย ปลอดภัย และสะดวกสบาย เพื่อสนับสนุนการซื้อขายภายในชุมชนโรงเรียน`,
    type: "website",
    images: 'https://market.yorwor.siraphop.me/assets/o.png',
    locale: 'th_TH',
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
        <NextTopLoader showSpinner={true} showAtBottom={true} color="#ef4444" height={4}
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><img class="spin" src="/favicon.ico"/></div>'
        />
        <NavbarNX />
        {children}
        <Footbar />
      </body>
    </html>
  );
}
