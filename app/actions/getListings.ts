import prisma from "@/app/libs/prismadb";

interface IListingsParams {
  userId?: string;
  category?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingsParams = {}) {
  try {
    const {
      userId,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
    } = await params;
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category !== undefined) {
      query.category = category;
    }

    if (roomCount !== undefined) {
      query.roomCount = { gte: +roomCount };
    }

    if (guestCount !== undefined) {
      query.guestCount = { gte: +guestCount };
    }

    if (bathroomCount !== undefined) {
      query.bathroomCount = { gte: +bathroomCount };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      query.AND = [
        ...(query.AND || []),
        {
          reservations: {
            none: {
              AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }],
            },
          },
        },
      ];
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings: " + error.message);
  }
}
