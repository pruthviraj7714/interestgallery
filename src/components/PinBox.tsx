import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { PostType } from "@/types/all-types";

export default function PinBox({
  pin,
  onSave,
}: {
  pin: PostType;
  onSave: (postId: string) => void;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/pin/${pin.id}`)}
      className="relative cursor-pointer group overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 mb-2"
    >
      <img src={pin.image} alt={pin.title} className="w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          onSave(pin.id);
        }}
        className="absolute right-3 top-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 shadow-md"
      >
        {pin.isSaved ? (
          <Button className="bg-black hover:bg-black text-white rounded-2xl">
            Saved
          </Button>
        ) : (
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl">
            Save
          </Button>
        )}
      </div>

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
