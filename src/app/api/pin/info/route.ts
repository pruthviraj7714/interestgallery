import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pinId = req.nextUrl.searchParams.get("Id");

  if (!pinId) {
    return NextResponse.json(
      {
        message: "Pin Id is missing",
      },
      { status: 403 }
    );
  }

  try {
    const pin = await prisma.post.findFirst({
      where: {
        id: pinId,
      },
      include: {
        user: true,
        comments: {
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
        pin,
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
