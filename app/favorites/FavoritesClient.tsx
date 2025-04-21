"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { Listing, User } from "@prisma/client";

import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import { removeFavorite } from "../actions/removeFavorite";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser?: User;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  const [isPending, startTransition] = useTransition();
  if (!currentUser) return null;

  const onRemoveFavorite = (listingId: string) => {
    axios
      .delete(`/api/favorites/${listingId}`)
      .then(() => {
        toast.success("Removed from favorites");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <div>
      <Heading title="My Favorites" subtitle="Your favorite listings" />
      <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            disabled={isPending}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesClient;
