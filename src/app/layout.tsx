import type { Metadata } from "next";
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  ThemeModeScript,
} from "flowbite-react";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <Navbar fluid>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="/" active as={Link}>
              Home
            </NavbarLink>
            <NavbarLink as={Link} href="advocates">
              Advocates
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
