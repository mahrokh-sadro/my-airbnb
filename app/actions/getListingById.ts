import prisma from "@/app/libs/prismadb";

export default async function getListingById(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
