"use client";

import PinBox2 from "@/components/PinBox2";
import { PostType } from "@/types/all-types";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface SavedPostType {
  id: string;
  post: PostType;
  userId: string;
  postId: string;
}

export default function SavedPinsPage() {
  const [posts, setPosts] = useState<any>([]);

  const fetchSavedPosts = async () => {
    try {
      const res = await axios.get("/api/pin/saved");
      setPosts(
        res.data.savedPins.map((sp: SavedPostType) => ({
          ...sp,
          post: {
            ...sp.post,
            isSaved: true,
          },
        }))
      );
      console.log(res.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleSave = async (pinId: string) => {
    try {
      const res = await axios.post(`/api/pin/save?pinId=${pinId}`);
      toast.success(res.data.message);
      setPosts((prev: SavedPostType[]) =>
        prev.filter((sp: SavedPostType) => sp.postId !== pinId)
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Your Saved Pins
        </h1>
        <p className="text-lg text-gray-600">
          Discover and organize your favorite ideas
        </p>
      </header>

      {posts && posts.length > 0 ? (
        <div className="columns-1 space-y-4 sm:columns-2-2 lg:columns-3-3 xl:columns-4 animate-fade-in">
          {posts.map((pin: SavedPostType) => (
            <div key={pin.id} className="animate-scale-in">
              <PinBox2 pin={pin.post} onSave={() => handleSave(pin.postId)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center animate-fade-in">
          <Bookmark className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Pins Found
          </h2>
          <p className="text-gray-500 max-w-md">
            Start saving some pins to see them here. Explore new ideas and save
            your favorites!
          </p>
        </div>
      )}
    </div>
  );
}
