import prisma from "@/app/libs/prismadb";

export default async function getListings(userId?: string) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error) {
    throw new Error("Failed to fetch listings");
  }
}
