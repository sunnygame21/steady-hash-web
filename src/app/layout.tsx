"use client";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { GlobalProvider } from "./state/global";

import "./globals.css";
import "react-calendar/dist/Calendar.css";

const noFooter = ["/login", "/product"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          <GlobalProvider>
            <>
              {children}
              {!noFooter.includes(pathname) && <Footer />}
            </>
          </GlobalProvider>
        </body>
      </html>
    </>
  );
}
