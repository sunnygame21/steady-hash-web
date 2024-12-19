"use client";
import Footer from "@/components/footer";
import Head from "next/head";
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
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <html lang="en">
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
