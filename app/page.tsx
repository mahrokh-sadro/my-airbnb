"use client";
import { useEffect, useState } from "react";
import LoginModal from "./components/modal/LoginModal";
import Modal from "./components/modal/modal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import { useSession } from "next-auth/react";
import Categories from "./components/Categories";
import RentModal from "./components/modal/RentModal";

export default function Home() {
  const { data: session, status } = useSession();
  // console.log("session in Home: ", session);

  return (
    <div>
      <Navbar currentUser={session?.user} />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <Categories />
    </div>
  );
}
