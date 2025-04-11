"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback, useState } from "react";
import axios from "axios";
import Heading from "../Heading";
import Input from "../inputs/input";
import { Button } from "@mui/material";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";

// Zod schema for validation
const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof schema>;

interface RentModalProps {
  currentUser?: User;
}

const RentModal = ({ currentUser }) => {
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  // const onSubmit = async (data: LoginFormData) => {};

  // const bodyContent = <div className="flex flex-col gap-4"></div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      // onSubmit={handleSubmit(onSubmit)}
      title="Airbnb your home"
      // body={bodyContent}
      // actionLabel={isLoading ? "Submitting..." : "Continue"}
      // footer={footerContent}
    />
  );
};

export default RentModal;
