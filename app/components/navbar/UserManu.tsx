"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: any;
}

const UserMenu: React.FC = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  return (
    <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
      {currentUser ? (
        <>
          <ul>
            <li
              className="py-2 hover:bg-gray-100"
              onClick={() => router.push("/trips")}
            >
              My Trips
            </li>
            <li
              className="py-2 hover:bg-gray-100"
              onClick={() => router.push("/favorites")}
            >
              MY Favorites
            </li>
            <li
              className="py-2 hover:bg-gray-100"
              onClick={() => router.push("/reservations")}
            >
              My Reservations
            </li>
            <li className="py-2 hover:bg-gray-100" onClick={() => {}}>
              My Properties
            </li>
            <hr className="border-b my-2" />
            <li className="py-2 hover:bg-gray-100" onClick={() => signOut()}>
              Logout
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li className="py-2 hover:bg-gray-100" onClick={loginModal.onOpen}>
              Login
            </li>
            <li
              className="py-2 hover:bg-gray-100"
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
