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

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof schema>;

interface LoginModalProps {
  currentUser?: User;
}

const LoginModal = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: "/",
      });

      if (response?.error) {
        alert(response.error);
      } else {
        // alert("Login successful!");
        loginModal.onClose();

        // router.push(router.asPath); // This will reload the page
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" />

      <Input
        id="email"
        label="Email"
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
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button variant="contained" onClick={() => signIn("google")} fullWidth>
        Continue with Google
      </Button>
      <Button variant="contained" onClick={() => signIn("github")} fullWidth>
        Continue with Github
      </Button>
      <div className=" text-neutral-300      ">
        <div className="flex flex-row items-center justify-center gap-2 mt-4">
          <div>First time using us?</div>
          <div
            className="cursor-pointer text-neutral-800"
            onClick={handleSignUpToggle}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      body={bodyContent}
      actionLabel={"Login"}
      footer={footerContent}
    />
  );
};

export default LoginModal;
