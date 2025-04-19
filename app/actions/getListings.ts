import prisma from "@/app/libs/prismadb";

interface IListingsParams {
  userId?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams = {}) {
  try {
    const { userId, category } = await params;

    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error) {
    throw new Error("Failed to fetch listings");
  }
}
