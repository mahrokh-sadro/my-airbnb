// components/listing/HeartButton.tsx
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import LoginModal from "../modal/LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface HeartButtonProps {
  listingId: string;
  currentUser: User;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const loginModal = useLoginModal();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // console.log("currentUser- heart------------>", currentUser);

  const isLiked = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // if (!currentUser) {
    //   return toast.error("Please log in to favorite listings.");
    // }

    setLoading(true);

    try {
      if (isLiked) {
        console.log("listingId", listingId);
        await axios.delete(`/api/favorites/${listingId}`);
        toast.success("Removed from favorites");
      } else {
        await axios.post(`/api/favorites/${listingId}`);
        toast.success("Added to favorites");
      }

      router.refresh(); // Refetch data and re-render
    } catch (error) {
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`
        transition 
        cursor-pointer 
        p-1 
        rounded-full 
        hover:bg-neutral-100 
        ${isLiked ? "text-rose-500" : "text-neutral-400"}
      `}
    >
      {isLiked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      )}
    </button>
  );
};

export default HeartButton;
