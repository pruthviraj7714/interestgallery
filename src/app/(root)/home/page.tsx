"use client";

import PinBox from "@/components/PinBox";
import { PostType } from "@/types/all-types";
import axios from "axios";
import { LucideLoader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getPosts = async () => {
    try {
      const res = await axios.get("/api/pin/all");
      setPosts(res.data.posts);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const savePin = async (pinId: string) => {
    try {
      const res = await axios.post(`/api/pin/save?pinId=${pinId}`);
      toast.success(res.data.message, { position: "bottom-center" });
      setPosts((prev: any) =>
        prev.map((post: PostType) =>
          post.id === pinId ? { ...post, isSaved: res.data.isSaved } : post
        )
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/api/user/info");
      setPosts((prev: any) =>
        prev?.map((post: PostType) => ({
          ...post,
          isSaved:
            res.data.user?.savedPosts?.some((p: any) => p.postId === post.id) ||
            false,
        }))
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user info");
    }
  };

  useEffect(() => {
    getPosts();
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center min-h-screen mt-40 space-y-4 p-6">
        <p className="text-xl font-medium text-gray-700">
          We are adding new feed to your gallery...
        </p>
        <div>
          <LucideLoader size={35} className="text-pink-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="columns-2 md:columns-3 xl:columns-4">
        {posts &&
          posts.length > 0 &&
          posts.map((post: PostType) => (
            <PinBox key={post.id} pin={post} onSave={() => savePin(post.id)} />
          ))}
      </div>
    </div>
  );
}
