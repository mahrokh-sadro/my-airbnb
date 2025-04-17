import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "./TripsClient";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="text-center mt-10 text-xl">
        Please login to view your trips.
      </div>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
