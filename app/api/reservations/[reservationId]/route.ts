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

  const paramsData = await params;
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: paramsData?.reservationId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(reservation);
}
