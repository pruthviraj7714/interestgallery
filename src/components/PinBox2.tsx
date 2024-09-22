import Link from "next/link";
import { UserCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostType } from "@/types/all-types";

export default function PinBox2({
  pin,
  onSave,
}: {
  pin: PostType;
  onSave: (pinId: string) => Promise<void>;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
      <Link href={`/pin/${pin.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={pin.image}
            alt={pin.title}
            className="h-full w-full object-cover transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-4 bottom-6 translate-y-4 transform space-y-3 transition-all duration-300 ease-in-out group-hover:translate-y-0">
          <h3 className="text-lg font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {pin.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserCircle className="h-6 w-6 text-white" />
              <span className="text-sm text-white">@{pin.user.username}</span>
            </div>
            <div
              onClick={async (e) => {
                e.preventDefault();
                await onSave(pin.id);
              }}
              className="absolute right-1 bottom-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 shadow-md"
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
          </div>
        </div>
      </Link>
    </div>
  );
}
