import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function removeFavorite(listingId: string) {
  const currentUser = await getCurrentUser();

  // if (!currentUser) throw new Error("Not logged in");

  // const updatedUser = await prisma.user.update({
  //   where: { id: currentUser.id },
  //   data: {
  //     favoriteIds: {
  //       set: (currentUser.favoriteIds || []).filter((id) => id !== listingId),
  //     },
  //   },
  // });

  return null;
}
