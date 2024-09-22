"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2Icon, MoreHorizontalIcon, SendIcon } from "lucide-react";
import { PinPageSkeleton } from "@/components/PinPageSkeleton";
import CommentBox from "@/components/CommentBox";
import { useRouter } from "next/navigation";
import { CommentType, PinType } from "@/types/all-types";
import { useSession } from "next-auth/react";
import { RWebShare } from "react-web-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { error } from "console";

export default function PinPage({
  params,
}: {
  params: {
    pinId: string;
  };
}) {
  const pinId = params.pinId;
  const [pinInfo, setPinInfo] = useState<PinType | null>(null);
  const [commentText, setCommentText] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getPinInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/pin/info?Id=${pinId}`);
      setPinInfo(res.data.pin);
      console.log(res.data.pin);
      setIsSaved(
        res.data.pin.savedBy.some(
          (post: any) => post.userId === session?.user.id
        )
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data.message || "Failed to load pin information"
      );
    } finally {
      setLoading(false);
    }
  };
  const addComment = async () => {
    try {
      const res = await axios.post(`/api/pin/comment?Id=${params.pinId}`, {
        text: commentText,
      });
      setCommentText("");
      toast.success("Comment successfully added!");
      setPinInfo({
        ...pinInfo,
        comments: [res.data.comment, ...(pinInfo?.comments || [])],
      } as PinType);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axios.delete(`/api/pin/comment/delete?Id=${commentId}`);
      toast.success("comment successfully deleted!");
      setPinInfo({
        ...pinInfo,
        comments: pinInfo?.comments.filter(
          (c: CommentType) => c.id !== commentId
        ),
      } as PinType);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const savePin = async () => {
    try {
      const res = await axios.post(`/api/pin/save?pinId=${params.pinId}`);
      toast.success(res.data.message, { position: "bottom-center" });
      setIsSaved(res.data.isSaved);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const deletePost = async (pinId: string) => {
    try {
      const res = await axios.delete(`/api/pin/delete?pinId=${pinId}`);
      toast.success(res.data.message);
      router.push("/home");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getPinInfo();
  }, [pinId]);

  if (loading || status == "loading") {
    return <PinPageSkeleton />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="h-[600px] md:w-1/2 bg-transparent">
            <img
              src={pinInfo?.image || "/placeholder.svg?height=600&width=400"}
              alt={pinInfo?.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="md:w-1/2 p-8 bg-white shadow-lg rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                {session?.user.id === pinInfo?.userId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-gray-100 rounded-full transition-all"
                      >
                        <MoreHorizontalIcon className="h-6 w-6 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => deletePost(params.pinId)}
                        className="cursor-pointer"
                      >
                        <div className=" hover:text-red-500 ">Delete</div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <RWebShare
                  data={{
                    text: "Like humans, flamingos make friends for life",
                    url: `${window.location.protocol}/pin/${params.pinId}`,
                    title: "Share with friends & family",
                  }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-gray-100 rounded-full transition-all"
                  >
                    <Share2Icon className="h-6 w-6 text-gray-600" />
                  </Button>
                </RWebShare>
              </div>

              <div onClick={savePin}>
                {!isSaved ? (
                  <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
                    Save
                  </Button>
                ) : (
                  <Button className="bg-black hover:bg-black text-white rounded-xl">
                    Saved
                  </Button>
                )}
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {pinInfo?.title || "Untitled Pin"}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {pinInfo?.description || "No description available."}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <div
                onClick={() => router.push(`/${pinInfo?.user.username}`)}
                className="cursor-pointer text-gray-800 h-10 w-10 rounded-full flex justify-center items-center bg-gray-200"
              >
                {pinInfo?.user.username.charAt(0).toUpperCase()}
              </div>
              <p
                onClick={() => router.push(`/${pinInfo?.user.username}`)}
                className="cursor-pointer font-semibold text-gray-900"
              >
                {pinInfo?.user?.username || "Unknown User"}
              </p>
            </div>

            <div className="border-t border-gray-300 pt-6 max-h-[320px] overflow-auto">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm">
                <textarea
                  className="w-full h-12 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-shadow resize-none"
                  placeholder="Add a comment..."
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  onClick={addComment}
                  className="p-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <SendIcon className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-4">
                {pinInfo?.comments.length ?? 0} Comments
              </h2>
              {pinInfo && pinInfo.comments && pinInfo.comments?.length > 0 ? (
                pinInfo.comments.map((comment: CommentType) => (
                  <CommentBox
                    onDelete={() => deleteComment(comment.id)}
                    key={comment.id}
                    comment={comment}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center my-4 text-center">
                  <span className="font-bold text-gray-800">
                    No comments yet!
                  </span>
                  <span className="text-gray-500">
                    Be the first to comment and start the conversation.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
