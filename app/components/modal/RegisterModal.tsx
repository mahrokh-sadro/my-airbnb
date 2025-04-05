"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Zod schema for validation
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

type RegisterFormData = z.infer<typeof schema>;

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  console.log(
    "isOpen in registerModal----------------------------------",
    registerModal.isOpen
  );
  return (
    <Modal
      isOpen={registerModal.isOpen} // This controls modal visibility
      onClose={registerModal.onClose} // Close modal when needed
      //   onSubmit={handleSubmit(onSubmit)} // Form submission
      title="Sign Up"
      //   body={bodyContent}
      actionLabel={isLoading ? "Submitting..." : "Continue"}
    />
  );
};

export default RegisterModal;
