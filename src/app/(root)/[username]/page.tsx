"use client";
import { PostType } from "@/types/all-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SavedPostType } from "../saved-pins/page";
import { Button } from "@/components/ui/button";
import PinBox3 from "@/components/PinBox3";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { RWebShare } from "react-web-share";

interface ProfileUserTypes {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  posts: PostType[];
  savedPosts: SavedPostType[];
  username: string;
}

export default function ProfilePage({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const [userInfo, setUserInfo] = useState<ProfileUserTypes | null>(null);
  const [activeTab, setActiveTab] = useState<"created" | "saved">("created");
  const [createdPosts, setCreatedPosts] = useState<PostType[]>([]);
  const [savedPosts, setSavedPosts] = useState<SavedPostType[]>([]);
  const { data: session, status } = useSession();

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(
        `/api/user/profile?username=${params.username}`
      );
      setUserInfo(res.data.user);
      setCreatedPosts(res.data.user.posts);
      setSavedPosts(res.data.user.savedPosts);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex flex-col items-center mt-5">
        <div className="w-32 h-32 flex justify-center text-black font-bold text-5xl bg-gray-200 items-center rounded-full">
          {userInfo?.username.charAt(0).toUpperCase()}
        </div>
        <div className="text-3xl text-black font-semibold mt-2">
          {userInfo?.firstname} {userInfo?.lastname}
        </div>
        <span className="text-gray-600 text-lg mt-1">
          @{userInfo?.username}
        </span>
        <div>
          <RWebShare
            data={{
              text: "Like humans, flamingos make friends for life",
              url: `${window.location.protocol}/${params.username}`,
              title: "Share with friends & family",
            }}
          >
            <Button className="mt-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white">
              Share
            </Button>
          </RWebShare>
        </div>
      </div>

      <div className="flex flex-col items-center mt-5 w-full">
        <div className="flex gap-6">
          <div
            className={`px-4 py-1 cursor-pointer font-semibold ${
              activeTab === "created" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("created")}
          >
            Created
          </div>
          <div
            className={`px-4 py-1 cursor-pointer font-semibold ${
              activeTab === "saved" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </div>
        </div>

        <div className="w-full mt-6">
          {activeTab === "created" ? (
            createdPosts && createdPosts.length > 0 ? (
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 space-y-4 min-h-screen p-6">
                {createdPosts.map((post: PostType) => (
                  <PinBox3 pin={post} key={post.id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10 flex-grow text-center animate-fade-in">
                {session?.user.id === userInfo?.id ? (
                  <div>
                    Nothing to show...yet! Pins that you create will live here.
                  </div>
                ) : (
                  <div className="text-xl font-semibold">
                    No Pins Posted by @{userInfo?.username} yet
                  </div>
                )}
                {session?.user.id === userInfo?.id && (
                  <Link
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 mt-4 rounded-lg"
                    href={"/create"}
                  >
                    Create Pin
                  </Link>
                )}
              </div>
            )
          ) : (
            <div className="w-full mt-6">
              {savedPosts && savedPosts.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 space-y-4 min-h-screen p-6">
                  {savedPosts.map((savedPost: SavedPostType) => (
                    <PinBox3 pin={savedPost.post} key={savedPost.id} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-10 flex-grow text-center animate-fade-in">
                  <Bookmark className="h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    No Pins Found
                  </h2>
                  <p className="text-gray-500 max-w-md">
                    Start saving some pins to see them here. Explore new ideas
                    and save your favorites!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
