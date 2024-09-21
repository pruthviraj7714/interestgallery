"use client";

import PinBox from "@/components/PinBox";
import { PostType } from "@/types/all-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/pin/all");
      console.log(res.data.posts);

      setPosts(res.data.posts);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/api/user/info");
      console.log(res.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
    getUserInfo();
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-6">
        <p className="text-lg font-medium text-gray-700">
          We are adding new feed to your gallery...
        </p>

        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-50"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="columns-2 md:columns-3 xl:columns-4">
        {posts &&
          posts.length > 0 &&
          posts.map((post: PostType) => <PinBox key={post.id} pin={post} />)}
      </div>
    </div>
  );
}
