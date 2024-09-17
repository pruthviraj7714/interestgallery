import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const pinId = req.nextUrl.searchParams.get("Id");

  if (!pinId) {
    return NextResponse.json(
      {
        message: "Pin Id is missing",
      },
      { status: 411 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "User not found!",
      },
      { status: 403 }
    );
  }
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        {
          message: "Comment Text is missing!",
        },
        { status: 411 }
      );
    }
    await prisma.comment.create({
      data: {
        postId: pinId,
        text: text,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Comment Successfully added!",
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
