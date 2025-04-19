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
  console.log("params-------------------------", params);
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

    // Log params for debugging
    // console.log("Received params:", params);

    // Build the query object
    const query: any = {};

    // Add filters based on provided parameters
    if (userId) {
      query.userId = userId;
    }

    if (category !== undefined) {
      // Check if category is defined
      query.category = category;
    }

    if (roomCount !== undefined) {
      // Check if roomCount is defined
      query.roomCount = { gte: +roomCount };
    }

    if (guestCount !== undefined) {
      // Check if guestCount is defined
      query.guestCount = { gte: +guestCount };
    }

    if (bathroomCount !== undefined) {
      // Check if bathroomCount is defined
      query.bathroomCount = { gte: +bathroomCount };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // Date filtering logic
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Log the parsed dates for debugging
      // console.log("Parsed start date:", start);
      // console.log("Parsed end date:", end);

      query.AND = [
        ...(query.AND || []),
        {
          reservations: {
            none: {
              AND: [
                { startDate: { lte: end } }, // Reservation ends before or on the end date
                { endDate: { gte: start } }, // Reservation starts after or on the start date
              ],
            },
          },
        },
      ];
    }

    // Log the final query object
    // console.log(
    //   "Final query being sent to Prisma:",
    //   JSON.stringify(query, null, 2)
    // );

    // Query the listings from the database
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Log the fetched listings for debugging
    // console.log("Listings found:", listings.length);

    // Return the filtered listings
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings: " + error.message);
  }
}
