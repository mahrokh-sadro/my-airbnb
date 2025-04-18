"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
// import { format } from "date-fns";
import HeartButton from "./HeartButton";
import { User } from "@prisma/client";

interface ListingCardProps {
  data: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  currentUser: User;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  currentUser,
}) => {
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
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <HeartButton currentUser={currentUser} listingId={data.id} />
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
      {onAction && actionLabel && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (disabled) return;
            onAction(reservation?.id);
          }}
          disabled={disabled}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ListingCard;
