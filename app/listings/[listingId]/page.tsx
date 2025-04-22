// app/listings/[listingId]/page.tsx
import getListingById from "@/app/actions/getListingById";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId: string;
}

export default async function ListingPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const paramsData = await params;
  const listing = await getListingById(paramsData.listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(paramsData);

  if (!listing) {
    return <div className="text-center text-xl mt-10">Listing not found</div>;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
