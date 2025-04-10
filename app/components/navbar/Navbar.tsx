"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import UserMenu from "./UserManu";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User;
}

const Navbar = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return (
    <nav className="flex items-center justify-between p-4 shadow-md sticky top-0 bg-white z-50">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>

      <SearchBar />

      <div className="flex items-center gap-4">
        {/* <UserMenu /> */}
        <Avatar currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
