import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
    const posts = await prisma.post.findMany({include : {
      user : {
        select : {
          username : true,
        }
      }
    }
    });

    return NextResponse.json({
      posts,
    }, { status : 200});
    
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
