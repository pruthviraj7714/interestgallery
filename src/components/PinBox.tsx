import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, UserCircle } from "lucide-react";
import { PostType } from "@/types/all-types";

export default function PinBox({ pin }: { pin: PostType }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/pin/${pin.id}`)}
      className="relative cursor-pointer group overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 mb-2"
    >
      <img
        src={pin.image}
        alt={pin.title}
        className="w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute right-2 top-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 shadow-md"
        size="icon"
      >
        <BookmarkIcon className="h-4 w-4" />
        <span className="sr-only">Save</span>
      </Button>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {pin.title}
        </h3>
        <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <UserCircle className="h-6 w-6 text-white mr-2" />
          <span className="text-white text-sm">@{pin?.user.username}</span>
        </div>
      </div>
    </div>
  );
}
