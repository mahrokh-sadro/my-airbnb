"use client";

import Image from "next/image";
import { useState } from "react";
import UserMenu from "./UserManu";
import { User } from "@prisma/client";
import { FaBars } from "react-icons/fa";

interface AvatarProps {
  currentUser?: User;
}

const Avatar = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-3 shadow-sm hover:shadow-md cursor-pointer transition"
      >
        <FaBars className="text-gray-600 text-sm" />
        <Image
          className="rounded-full"
          src={currentUser?.image || "/images/icon.png"}
          alt="User"
          width={30}
          height={30}
        />
      </div>

      {isMenuOpen && (
        <UserMenu
          currentUser={currentUser}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Avatar;
