"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Appbar() {
    const router = useRouter();
    return (
        <header className="bg-gradient-to-r from-pink-100 to-pink-300 shadow-lg">
        <div className="container mx-auto flex justify-between items-center h-16 px-6">
          <div className="flex items-center gap-4">
              <Link href="/home">
                <div className="text-2xl font-bold text-pink-600  transition-colors duration-300">
                  InterestGallery
                </div>
              </Link>
            <div>
              <Button onClick={() => router.push('/create')}>
                Create
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant={"destructive"} onClick={ async () => {
                await signOut({redirect : false})
                router.push('/')
            } }>
                Logout
            </Button>
          </div>
        </div>
      </header>
    )
}