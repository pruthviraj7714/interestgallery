import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "User not authenticated!" },
      { status: 403 }
    );
  }

  try {
    const pinId = req.nextUrl.searchParams.get("pinId");

    if (!pinId) {
      return NextResponse.json(
        {
          message: "Pin Id is missing",
        },
        { status: 411 }
      );
    }

    const saved = await prisma.savedPost.findFirst({
      where: {
        userId: session?.user.id,
        postId: pinId,
      },
    });

    if (!saved) {
      await prisma.savedPost.create({
        data: {
          userId: session?.user.id,
          postId: pinId,
        },
      });

      return NextResponse.json({
        message: "Post Saved Successfully!",
        isSaved : true
      });
    } else {
      await prisma.savedPost.deleteMany({
        where: {
          userId: session?.user.id,
          postId: pinId,
        },
      });

      return NextResponse.json({
        message: "Post Unsaved Successfully!",
        isSaved : false
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
