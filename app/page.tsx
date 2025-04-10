"use client";
import { useEffect } from "react";
import LoginModal from "./components/modal/LoginModal";
import Modal from "./components/modal/modal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/auth/user/me");
      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
      }
      // else {
      //   setUser(null); // User is not authenticated
      // }

      // setLoading(false); // Stop loading after the request
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* <Modal isOpen={true} actionLabel={"aaaaaaaaa"} /> */}
      <RegisterModal />
      <LoginModal />
    </div>
  );
}
