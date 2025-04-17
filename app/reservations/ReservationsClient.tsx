"use client";

import { Reservation, User } from "@prisma/client";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ReservationsClientProps {
  reservations: Reservation[];
  currentUser: User;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();

  const onCancel = (id: string) => {
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to cancel reservation");
      });
  };

  return (
    <div className="p-4">
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionLabel="Cancel guest reservation"
            onAction={onCancel}
            disabled={false}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationsClient;
