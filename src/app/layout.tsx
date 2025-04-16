"use client";

import "./globals.css";
import AppNavBar from "@/components/NavBar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <AppNavBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
