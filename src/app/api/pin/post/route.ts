import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { postSchema } from "@/schemas/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "User not found!",
      },
      { status: 403 }
    );
  }

  const parsedBody = postSchema.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid Inputs",
        error: parsedBody.error,
      },
      { status: 411 }
    );
  }

  try {
    const { title, description, image, category } = parsedBody.data;

    await prisma.post.create({
      data: {
        userId: session.user.id,
        title,
        description,
        category,
        image,
      },
    });

    return NextResponse.json(
      {
        message: "Post successfully Created!",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
