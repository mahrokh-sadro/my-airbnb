// app/actions/favorites.ts

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getFavorites = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("User not found");
  }

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds || [],
      },
    },
  });

  return favorites;
};

export const removeFavorite = async (listingId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds: {
        set: currentUser.favoriteIds.filter((id: any) => id !== listingId),
      },
    },
  });

  return updatedUser;
};
