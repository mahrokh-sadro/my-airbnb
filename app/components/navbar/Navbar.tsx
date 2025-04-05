"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import UserMenu from "./UserManu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md sticky top-0 bg-white z-50">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={40}
          className="object-contain"
        />
      </Link>

      <SearchBar />

      <div className="flex items-center gap-4">
        {/* <UserMenu /> */}
        <Avatar />
      </div>
    </nav>
  );
};

export default Navbar;
