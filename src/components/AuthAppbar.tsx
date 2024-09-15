import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthAppbar() {
  return (
    <div className="flex justify-between p-6 items-center h-12 border-b border-white/15 shadow-lg">
      <Link href={'/'}>Interestgallery</Link>
      <div className="flex items-center justify-end gap-5">
        <Link href={"/auth/signup"}>
          <Button>Signup</Button>
        </Link>
        <Link href={"/auth/signin"}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
