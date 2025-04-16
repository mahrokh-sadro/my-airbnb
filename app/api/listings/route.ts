import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  console.log("----------->", body);

  const newListing = await prisma.listing.create({
    data: {
      title: body.title,
      description: body.description,
      price: body.price,
      category: body.category,
      roomCount: body.roomCount,
      bathroomCount: body.bathroomCount,
      guestCount: body.guestCount,
      locationValue: body.location.value,
      image: body.image,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(newListing, { status: 201 });
}
