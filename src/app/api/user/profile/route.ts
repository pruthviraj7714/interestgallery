import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "User not authenticated!",
        },
        { status: 403 }
      );
    }

    const username = req.nextUrl.searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        {
          message: "username is missing",
        },
        { status: 411 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        posts: {
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
        username: true,
        lastname: true,
        firstname: true,
        id: true,
        email: true,
        savedPosts: {
          include: {
            post: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
