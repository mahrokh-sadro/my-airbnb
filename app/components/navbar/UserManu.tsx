"use client";

import useRegisterModal from "../../hooks/useRegisterModal";

// import useRegisterModal from "@/hooks/useRegisterModal";

const UserMenu: React.FC = () => {
  const registerModal = useRegisterModal();
  return (
    <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
      <ul>
        <li className="py-2 hover:bg-gray-100">Login</li>
        <li className="py-2 hover:bg-gray-100">
          <button onClick={registerModal.onOpen} className="text-blue-500">
            Sign up
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
