import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { listing: true },
  });

  if (
    !reservation ||
    (reservation.userId !== currentUser.id &&
      reservation.listing.userId !== currentUser.id)
  ) {
    return NextResponse.error();
  }

  const deletedReservation = await prisma.reservation.delete({
    where: { id: reservationId },
  });

  return NextResponse.json(deletedReservation);
}
