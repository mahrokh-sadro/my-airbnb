"use client";

import Image from "next/image";
import { useState } from "react";
import UserMenu from "./UserManu";

const Avatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Image
        className="rounded-full object-contain"
        src="/images/1.jpg"
        alt="Logo"
        width={30}
        height={30}
      />
      {isMenuOpen && <UserMenu />}
    </div>
  );
};

export default Avatar;
