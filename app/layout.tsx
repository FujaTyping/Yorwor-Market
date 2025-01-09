import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
