// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../[...nextauth]/route"; // Ensure this path is correct

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
