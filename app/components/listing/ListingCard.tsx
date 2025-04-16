"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { SafeListing } from "@/app/types"; // optional: define SafeListing if you're using types
import { format } from "date-fns";
import HeartButton from "./HeartButton";

interface ListingCardProps {
  data: any;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const router = useRouter();
  const handleHeartClick = () => {};

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="cursor-pointer group"
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          className="object-cover group-hover:scale-110 transition"
          src={data.image}
          alt="Listing"
        />
        <div className="absolute top-4 right-4">
          <HeartButton />
        </div>
      </div>

      <div className="mt-3 text-sm">
        <div className="font-semibold text-lg">
          {data.locationValue || "Unknown Location"}
        </div>
        <div className="text-gray-500">{data.category}</div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-gray-800 font-semibold">
            ${data.price}
            <span className="text-sm font-normal text-gray-500"> night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
