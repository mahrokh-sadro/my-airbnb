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
import CounterInput from "../inputs/CounterInput";
import ImageUpload from "../inputs/ImageUpload";

interface RentModalProps {
  currentUser?: User;
}

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  // AMENITIES: 3,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const schema = z.object({
  category: z.string(),
  location: z.object({
    latlng: z.tuple([z.number(), z.number()]),
    label: z.string(),
    region: z.string(),
    value: z.string(),
    flag: z.string(),
  }),
  guestCount: z.number().min(1, "At least one guest"),
  roomCount: z.number().min(1, "At least one room"),
  bathroomCount: z.number().min(1, "At least one bathroom"),
  // amenities: z.array(z.string()).min(1, "Select at least one amenity"),

  image: z.string().min(1, "Image is required"),
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
      location: {
        latlng: [51.505, -0.09],
        label: "",
        region: "",
        value: "",
        flag: "",
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      // amenities: [],
      image: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const image = watch("image");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        ssr: false,
      }),
    [location]
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
        <div className="h-[35vh] w-full overflow-hidden rounded-lg z-0">
          <Map center={location?.latlng || [51.505, -0.09]} />
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <CounterInput
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) =>
            setValue("guestCount", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />

        <CounterInput
          title="Rooms"
          subtitle="How many rooms do you allow?"
          value={roomCount}
          onChange={(value) =>
            setValue("roomCount", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />

        <CounterInput
          title="Bathrooms"
          subtitle="How many bathrooms do you allow?"
          value={bathroomCount}
          onChange={(value) =>
            setValue("bathroomCount", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={image}
          onChange={(value) =>
            setValue("image", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
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
