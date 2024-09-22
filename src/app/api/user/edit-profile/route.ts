import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "User not authenticated!",
      },
      { status: 403 }
    );
  }
  try {
    const { email, firstname, lastname } = await req.json();

    if (!email || !firstname || !lastname) {
      return NextResponse.json(
        {
          message: "Invalid Inputs",
        },
        { status: 411 }
      );
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        email,
        firstname,
        lastname,
      },
    });

    return NextResponse.json({
        message : "Profile Successfully Updated!"
    }, { status : 200})
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
