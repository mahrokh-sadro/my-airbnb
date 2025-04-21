import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "../libs/authOptions";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
}
