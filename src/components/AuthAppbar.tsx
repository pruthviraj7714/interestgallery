import Link from "next/link";
import { Button } from "./ui/button";
import { User, LogIn } from "lucide-react";

export default function AuthAppbar() {
  return (
    <header className="bg-gradient-to-r from-pink-100 to-pink-300 shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <Link href="/">
          <div className="text-2xl font-bold text-pink-600  transition-colors duration-300">
            InterestGallery
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/auth/signup">
            <Button className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition-transform duration-300 transform hover:scale-105">
              <User className="w-4 h-4" />
              <span>Signup</span>
            </Button>
          </Link>

          <Link href="/auth/signin">
            <Button className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 rounded-xl font-semibold transition-transform duration-300 transform hover:scale-105">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
