import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return NextResponse.json({
                message : "User not authenticated!"
            }, { status : 403})
        }

        const user = await prisma.user.findUnique({
            where : {
                id : session.user.id
            },
            select : {
                username : true,
                savedPosts : true,
                posts : true,
                firstname : true,
                lastname : true
            }
        })

        return NextResponse.json({
            user
        }, { status : 200})

    } catch (error) {
        return NextResponse.json({
            message : "Internal Server Error"
        }, { status :500})
    }
}