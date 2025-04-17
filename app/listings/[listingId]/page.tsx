// app/listings/[listingId]/page.tsx
import getListingById from "@/app/actions/getListingById";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const paramsData = await params;
  const listing = await getListingById(paramsData.listingId);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <div className="text-center text-xl mt-10">Listing not found</div>;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
}
