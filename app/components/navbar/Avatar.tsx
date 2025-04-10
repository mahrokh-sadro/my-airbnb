"use client";

import Image from "next/image";
import { useState } from "react";
import UserMenu from "./UserManu";
import { User } from "@prisma/client";

interface AvatarProps {
  currentUser?: User;
}

const Avatar = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Image
        className="rounded-full object-contain"
        src={currentUser?.image || "/images/1.jpg"}
        alt="Logo"
        width={30}
        height={30}
      />
      {isMenuOpen && <UserMenu currentUser={currentUser} />}
    </div>
  );
};

export default Avatar;
