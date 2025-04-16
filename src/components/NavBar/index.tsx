import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  NavbarBrand,
} from "flowbite-react";
import Link from "next/link";

const AppNavBar = () => {
  return (
    <Navbar fluid className="justify-between">
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Solace
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink className="list-none" as={Link} href="/advocates">
          Home
        </NavbarLink>
        <NavbarLink className="list-none" as={Link} href="/advocates">
          Advocates
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default AppNavBar;
