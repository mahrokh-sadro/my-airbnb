"use client";

import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import axios from "axios";
import toast from "react-hot-toast";

interface TripsClientProps {
  reservations: Reservation[];
  currentUser: User;
}

const TripsClient: React.FC<TripsClientProps> = ({
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
    <div>
      <Heading
        title="Your Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionLabel="Cancel reservation"
            onAction={onCancel}
            disabled={false}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default TripsClient;
