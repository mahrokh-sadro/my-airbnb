"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Heading from "../Heading";
import Input from "../inputs/input";
import { Button } from "@mui/material";
import { sign } from "crypto";
import useLoginModal from "@/app/hooks/useLoginModal";

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
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      axios.post("/api/register", data).then((response) => {
        registerModal.onClose();
        loginModal.onOpen();
      });
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGitHubSignIn = async () => {
  //   const response = await signIn("github", {
  //     redirect: false,
  //     // callbackUrl: "/",
  //   });

  //   if (response?.error) {
  //     alert("Error during GitHub login: " + response.error);
  //   } else {
  //     // router.push("/dashboard");
  //   }
  // };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to here" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const handleSignUpToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <hr className="w-full" /> */}
      <Button variant="contained" onClick={() => signIn("google")}>
        Continue with Google
      </Button>
      <Button variant="contained" onClick={() => signIn("github")}>
        Continue with Github
      </Button>
      <div className=" text-neutral-300      ">
        <div className="flex flex-row items-center justify-center gap-2 mt-4">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer text-neutral-800"
            onClick={handleSignUpToggle}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Sign Up"
      body={bodyContent}
      actionLabel={isLoading ? "Submitting..." : "Continue"}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
