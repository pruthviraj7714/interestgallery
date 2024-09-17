"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Heart, LogOut, PlusCircle } from "lucide-react"

export default function Appbar() {
  const router = useRouter()

  return (
    <header className="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container flex justify-between items-center h-20 px-6">
        <div className="flex items-center gap-6">
          <Link href="/home" className="group">
            <div className="flex items-center gap-2 text-2xl font-bold text-pink-600 transition-colors duration-300 ease-in-out group-hover:text-pink-700">
              <Heart className="w-8 h-8 text-pink-500 transition-transform duration-300 ease-in-out group-hover:scale-110" />
              <span className="transition-all duration-300 ease-in-out group-hover:tracking-wider">
                InterestGallery
              </span>
            </div>
          </Link>
          <Button
            onClick={() => router.push('/create')}
            variant="outline"
            className="bg-white hover:bg-pink-50 text-pink-600 border-pink-300 hover:border-pink-400 transition-all duration-300 ease-in-out hover:shadow-md"
          >
            <PlusCircle className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
            Create
          </Button>
        </div>

        <div>
          <Button
            variant="ghost"
            className="bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 ease-in-out hover:shadow-md"
            onClick={async () => {
              await signOut({ redirect: false })
              router.push('/')
            }}
          >
            <LogOut className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}