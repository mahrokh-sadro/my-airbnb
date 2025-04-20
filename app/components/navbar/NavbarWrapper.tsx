"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

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
