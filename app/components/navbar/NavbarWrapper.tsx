"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

// Lazy load Navbar with SSR disabled
const Navbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

interface NavbarWrapperProps {
  currentUser: any;
}

const NavbarWrapper: FC<NavbarWrapperProps> = ({ currentUser }) => {
  return <Navbar currentUser={currentUser} />;
};

export default NavbarWrapper;
