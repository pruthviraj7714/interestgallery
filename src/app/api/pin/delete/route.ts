import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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
          message: "Pin Id is missing!",
        },
        { status: 411 }
      );
    }

    await prisma.post.delete({
      where: {
        userId: session.user.id,
        id: pinId,
      },
    });

    return NextResponse.json(
      {
        message: "Post Successfully deleted!",
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
