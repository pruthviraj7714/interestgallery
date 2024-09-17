"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookmarkIcon,
  Share2Icon,
  MoreHorizontalIcon,
  UserCircle,
  SendIcon,
} from "lucide-react";
import { PinPageSkeleton } from "@/components/PinPageSkeleton";
import CommentBox from "@/components/CommentBox";
import { useRouter } from "next/navigation";

export default function PinPage({
  params,
}: {
  params: {
    pinId: string;
  };
}) {
  const pinId = params.pinId;
  const [pinInfo, setPinInfo] = useState<any>(null);
  const [commentText, setCommentText] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getPinInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/pin/info?Id=${pinId}`);
      setPinInfo(res.data.pin);
      console.log(res.data.pin.comments);
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
      await axios.post(`/api/pin/comment?Id=${params.pinId}`, {
        text: commentText,
      });
      setCommentText("");
      router.refresh();
      toast.success("Comment successfully added!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axios.delete(`/api/pin/comment/delete?Id=${commentId}`);
      toast.success("comment successfully deleted!");
    } catch (error: any) {
      toast.error(error.reponse.data.message);
    }
  };

  useEffect(() => {
    getPinInfo();
  }, [pinId]);

  if (loading) {
    return <PinPageSkeleton />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gray-200">
            <img
              src={pinInfo?.image || "/placeholder.svg?height=600&width=400"}
              alt={pinInfo?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Button size="icon" variant="ghost">
                  <MoreHorizontalIcon className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Share2Icon className="h-6 w-6" />
                </Button>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <BookmarkIcon className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-4">
              {pinInfo?.title || "Untitled Pin"}
            </h1>
            <p className="text-gray-600 mb-6">
              {pinInfo?.description || "No description available."}
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar>
                <AvatarImage src={pinInfo?.user?.avatar} />
                <AvatarFallback>
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                  {pinInfo?.user?.name || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500">
                  {pinInfo?.user?.followers || 0} followers
                </p>
              </div>
              <Button variant="outline">Follow</Button>
            </div>
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">
                {pinInfo.comments.length ?? 0} Comments
              </h2>
              {pinInfo && pinInfo.comments && pinInfo.comments?.length > 0 ? (
                pinInfo.comments.map((comment: any) => (
                  <CommentBox
                    onDelete={() => deleteComment(comment.id)}
                    key={comment.id}
                    comment={comment}
                  />
                ))
              ) : (
                <div className="flex flex-col my-4">
                  <span className="font-bold">No comments yet!</span>
                  <span className="text-gray-600">
                    No comments yet. Add one to start the conversation.
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg shadow-md">
                <textarea
                  className="w-full h-12 p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-shadow resize-none"
                  placeholder="Add a comment..."
                  defaultValue={
                    (commentText !== null && commentText) || "Add a comment..."
                  }
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="p-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
                  <SendIcon onClick={addComment} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
