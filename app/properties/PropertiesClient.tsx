"use client";

import { Listing, User } from "@prisma/client";
import ListingCard from "../components/listing/ListingCard";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  if (!currentUser) {
    return (
      <div className="p-4 text-center text-xl">
        You must be logged in to view your properties.
      </div>
    );
  }
  const onDelete = (listingId: string) => {
    axios
      .delete(`/api/listings/${listingId}`)
      .then(() => {
        toast.success("Listing deleted");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Heading title="My Properties" subtitle="List of your properties" />
      <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onDelete}
            actionLabel="Delete Property"
            disabled={false}
            reservation={{ id: listing.id }}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesClient;
