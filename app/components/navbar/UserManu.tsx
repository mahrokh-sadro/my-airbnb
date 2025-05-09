"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: any;
  setIsMenuOpen?: any;
  isMenuOpen?: any;
  onClick?: any;
}

const UserMenu: React.FC = ({ currentUser, setIsMenuOpen }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  return (
    <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
      {currentUser ? (
        <>
          <ul>
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push("/trips");
                setIsMenuOpen(false);
              }}
            >
              My Trips
            </li>
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push("/favorites");
                setIsMenuOpen(false);
              }}
            >
              MY Favorites
            </li>
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push("/reservations");
                setIsMenuOpen(false);
              }}
            >
              My Reservations
            </li>
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push("/properties");
                setIsMenuOpen(false);
              }}
            >
              My Properties
            </li>
            <hr className="border-b my-2" />
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={loginModal.onOpen}
            >
              Login
            </li>
            <li
              className="py-2 hover:bg-gray-100 cursor-pointer"
              onClick={registerModal.onOpen}
            >
              Sign up
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default UserMenu;
