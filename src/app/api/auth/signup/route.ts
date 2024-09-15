import { signUpSchema } from "@/schemas/schema";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const parsedBody = signUpSchema.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid Inputs",
      },
      { status: 411 }
    );
  }
  try {
    const { firstname, lastname, username, email, password } = parsedBody.data;

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Account Successfully Created",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error,
      },
      { status: 500 }
    );
  }
}
