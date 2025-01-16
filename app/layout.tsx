import "@/styles/globals.css";
import NextTopLoader from 'nextjs-toploader';
import { NavbarNX } from "@/components/navbar";
import { Footbar } from "@/components/footbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <NextTopLoader showSpinner={false} />
        <NavbarNX />
        {children}
        <Footbar />
      </body>
    </html>
  );
}
