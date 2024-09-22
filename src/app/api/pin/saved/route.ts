import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "User not authenticated!" },
      { status: 403 }
    );
  }

  try {
    const savedPins = await prisma.savedPost.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                username: true,
                firstname: true,
                lastname: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        savedPins,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error!",
      },
      { status: 500 }
    );
  }
}
