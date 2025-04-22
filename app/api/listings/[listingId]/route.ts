import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function DELETE(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const listingId = params.listingId;

  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
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
