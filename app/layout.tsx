import "@/styles/globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Navbar } from "@/components/navbar";
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
        <Navbar />
        {children}
        <Footbar />
      </body>
    </html>
  );
}
