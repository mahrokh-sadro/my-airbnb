"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

const UserMenu: React.FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
      <ul>
        <li className="py-2 hover:bg-gray-100" onClick={loginModal.onOpen}>
          Login
        </li>
        <li className="py-2 hover:bg-gray-100" onClick={registerModal.onOpen}>
          Sign up
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
