import { getCurrentUser } from "@/app/actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please log in" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like no one has booked your listings yet."
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
