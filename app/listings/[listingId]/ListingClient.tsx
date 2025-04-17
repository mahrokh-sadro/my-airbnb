"use client";

import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import HeartButton from "@/app/components/listing/HeartButton";
import { getCountryByValue } from "@/app/utils/getCountryByValue";
import { useCallback, useMemo, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import ListingReservation from "@/app/components/listing/ListingReservation";

interface ListingClientProps {
  listing: any;
  currentUser: User | null;
  reservations?: Reservation[];
}
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
const Map = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const router = useRouter();
  const location = getCountryByValue(listing.locationValue);
  const coordinates = location?.latlng || [51.505, -0.09];
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  // const totalPrice = useMemo(() => {
  //   return listing.price*
  // }, [reservations, dateRange]);
  const numberOfNights = useMemo(() => {
    const start = dateRange.startDate!;
    const end = dateRange.endDate!;
    return differenceInCalendarDays(end, start) || 1;
  }, [dateRange]);

  // 💰 Calculate total price
  const totalPrice = useMemo(() => {
    return listing.price * numberOfNights;
  }, [listing.price, numberOfNights]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onClose();
    }

    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Reservation created!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateRange, listing?.id, totalPrice, router, currentUser, loginModal]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={listing.image}
          alt="Listing Image"
          fill
          className="object-cover"
        />
        <div className="absolute top-5 right-5 z-10">
          <HeartButton listingId={listing.id} currentUser={currentUser!} />
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <p className="text-gray-600 mt-2">{listing.description}</p>
        <div className="text-lg mt-4">
          <span className="font-semibold">${listing.price}</span> night
        </div>
      </div>
      <hr />
      <Map center={coordinates} />

      <ListingReservation
        price={listing.price}
        totalPrice={totalPrice}
        dateRange={dateRange}
        onChangeDate={setDateRange}
        onSubmit={onCreateReservation}
        disabled={isLoading}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default ListingClient;
