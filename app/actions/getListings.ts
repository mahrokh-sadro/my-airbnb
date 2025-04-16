import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany();
    return listings;
  } catch (error) {
    throw new Error("Failed to fetch listings");
  }
}
