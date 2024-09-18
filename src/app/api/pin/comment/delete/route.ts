import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized user!",
      },
      { status: 403 }
    );
  }

  const commentId = req.nextUrl.searchParams.get("Id");

  if (!commentId) {
    return NextResponse.json(
      {
        message: "Comment Id is missing!",
      },
      { status: 411 }
    );
  }

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
        userId: session.user.id,
      },
    });

    if (!comment) {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this comment!",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Comment Successfully deleted!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
