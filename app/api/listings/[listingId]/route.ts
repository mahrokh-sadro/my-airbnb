import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing || listing.userId !== currentUser.id) {
    return NextResponse.error();
  }

  await prisma.listing.delete({
    where: { id: listingId },
  });

  return NextResponse.json({ success: true });
}
