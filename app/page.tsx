"use client";
import { useEffect, useState } from "react";
import LoginModal from "./components/modal/LoginModal";
import Modal from "./components/modal/modal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("session in Home: ", session);

  return (
    <div>
      <Navbar currentUser={session} />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      {/* <Modal isOpen={true} actionLabel={"aaaaaaaaa"} /> */}
      <RegisterModal />
      <LoginModal />
    </div>
  );
}
