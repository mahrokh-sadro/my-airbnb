import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
  { params: { listingId } }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    // const { listingId } = await params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: {
          push: listingId,
        },
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params: { listingId } }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    // const { listingId } = await params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: {
          set: currentUser.favoriteIds.filter((id) => id !== listingId),
        },
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 }
    );
  }
}
