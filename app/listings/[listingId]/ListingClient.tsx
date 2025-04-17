"use client";

import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import HeartButton from "@/app/components/listing/HeartButton";
import { getCountryByValue } from "@/app/utils/getCountryByValue";

interface ListingClientProps {
  listing: any;
  currentUser: User | null;
  reservations?: Reservation[];
}
const Map = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const router = useRouter();
  console.log("listing", listing);
  const location = getCountryByValue(listing.locationValue);
  const coordinates = location?.latlng || [51.505, -0.09];
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
    </div>
  );
};

export default ListingClient;
