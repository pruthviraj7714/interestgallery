"use client";

import PinBox from "@/components/PinBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
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
          posts.map((post: any) => <PinBox key={post.id} pin={post} />)}
      </div>
    </div>
  );
}
