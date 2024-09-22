"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, LogOut, PlusCircle } from "lucide-react";

export default function Appbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <header className="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center h-20 px-6">
        <div className="flex items-center gap-6">
          <Link href="/home" className="group">
            <div className="flex items-center gap-2 text-2xl font-extrabold text-pink-600 group-hover:text-pink-700">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="">InterestGallery</span>
            </div>
          </Link>
          <Button
            onClick={() => router.push("/create")}
            variant="outline"
            className="bg-white hover:bg-pink-50 text-pink-600 border-pink-300 hover:border-pink-400 transition-all duration-300 ease-in-out hover:shadow-lg rounded-full"
          >
            <PlusCircle className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
            Create
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="h-10 w-10 rounded-full border border-gray-200 flex justify-center items-center hover:bg-pink-200 transition-colors duration-300 ease-in-out">
                <span className="font-bold text-lg">P</span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-lg border border-pink-300">
              <DropdownMenuLabel className="font-semibold text-pink-600">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/${session?.user.username}`)}
                className="hover:bg-pink-50"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/saved-pins")}
                className="hover:bg-pink-50"
              >
                Saved Pins
              </DropdownMenuItem>
              <Button
                className="bg-pink-400 hover:bg-pink-500 text-white mt-2 w-full rounded-full transition-all duration-300 ease-in-out hover:shadow-lg"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
              >
                <LogOut className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
                Logout
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
