"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import Heading from "../Heading";
import Input from "../inputs/input";
import { Button } from "@mui/material";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../constants/categoriesArray";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import dynamic from "next/dynamic";

interface RentModalProps {
  currentUser?: User;
}

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  AMENITIES: 3,
  IMAGES: 4,
  DESCRIPTION: 5,
  PRICE: 6,
};

const schema = z.object({
  category: z.string(), // we’ll just start with category
  // add more fields later like location, price, etc.
});

const RentModal = ({ currentUser }) => {
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  // const onNext = () => setStep((prev) => prev + 1);
  // const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);
  const onBack = () => setStep((prev) => prev - 1);
  const actionLabel = step === STEPS.PRICE ? "Create" : "Next";
  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : "Back";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        ssr: false,
      }),
    []
  );

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Which of these best describes your place?" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3">
        {categories.map((item) => (
          <div key={item.name} className="col-span-1">
            {/* {item.name} */}
            <CategoryInput
              onClick={() =>
                setValue("category", item.name, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
              selected={category === item.name}
              label={item.name}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4 mb-4">
        <Heading title="Where is your place located?" />
        <CountrySelect
          value={location}
          onChange={(value) =>
            setValue("location", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        />
        <Map />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      title="Airbnb your home"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
    />
  );
};

export default RentModal;
