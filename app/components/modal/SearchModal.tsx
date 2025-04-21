"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./modal";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import CounterInput from "../inputs/CounterInput";

// interface SearchModalProps {}

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
};

const SearchModal: React.FC<SearchModalProps> = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.label,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);

    searchModal.onClose();
    router.push(url);
  }, [
    step,
    onNext,
    params,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    searchModal,
    router,
  ]);

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "Search" : "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="" subtitle="" />
      <CountrySelect
        value={location}
        onChange={(val) => setLocation(val as CountrySelectValue)}
      />
      <div className="h-[35vh] w-full overflow-hidden rounded-lg z-0">
        <Map center={location?.latlng || [51.505, -0.09]} />
      </div>
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Calendar
          value={dateRange}
          onChange={(val) => setDateRange(val.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <CounterInput
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(val) => setGuestCount(val)}
        />
        <CounterInput
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(val) => setRoomCount(val)}
        />
        <CounterInput
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(val) => setBathroomCount(val)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
