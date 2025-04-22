"use client";

import Link from "next/link";
import React, { use, useCallback } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import UserMenu from "./UserManu";
import { User } from "@prisma/client";
import Categories from "../Categories";
import { useRouter } from "next/navigation";
import { FaGlobe, FaGlobeAmericas, FaGlobeEurope } from "react-icons/fa";
import useRentModal from "@/app/hooks/useRentModal";
import LoginModal from "../modal/LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { usePathname } from "next/navigation";

interface NavbarProps {
  currentUser?: User;
}

const Navbar = ({ currentUser }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const pathname = usePathname();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, rentModal, loginModal]);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md sticky top-0 bg-white z-1000">
      <div className="flex items-center cursor-pointer gap-2">
        {/* <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={85}
          height={45}
          className="object-contain rounded-full"
          onClick={() => router.push("/")}
        /> */}
        <FaGlobeAmericas
          className="text-5xl "
          style={{ color: "#a08862" }}
          onClick={() => router.push("/")}
        />
      </div>

      <div className="flex items-center gap-4">
        <div
          className="hidden md:flex items-center gap-2 cursor-pointer"
          onClick={onRent}
        >
          <span className="text-sm font-medium">Airbnb your home</span>
          <FaGlobe className="text-2xl " style={{ color: "#a08862" }} />
        </div>
        <Avatar currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
