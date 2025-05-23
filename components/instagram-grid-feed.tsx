"use client";
import type React from "react";
import { InstagramMedia } from "@/app/(dashboard)/posts-comments/page";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Heart, MessageCircle, Bookmark, X } from "lucide-react";

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <span className="sr-only">{children}</span>;
};

interface InstagramGridFeedProps {
  mediaData?: InstagramMedia[];
}

export default function InstagramGridFeed({
  mediaData = [],
}: InstagramGridFeedProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramMedia | null>(null);
  const [commentText, setCommentText] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Use mock data only if no real data is provided
  const posts = mediaData.length > 0 ? mediaData : [];

  const handleClosePost = () => {
    setSelectedPost(null);
    setCommentText("");
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const postDate = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - postDate.getTime()) / 1000
      );

      if (diffInSeconds < 60) return `${diffInSeconds}s`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
      if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)}d`;
      if (diffInSeconds < 2592000)
        return `${Math.floor(diffInSeconds / 604800)}w`;
      return `${Math.floor(diffInSeconds / 2592000)}mo`;
    } catch (e) {
      return timestamp || "unknown";
    }
  };

  const PostContent = ({ post }: { post: InstagramMedia }) => (
    <div className="flex flex-col h-full md:flex-row md:h-[80vh]">
      {/* Post Image */}
      <div className="relative bg-black flex-shrink-0 md:w-[60%] flex items-center justify-center">
        <img
          src={post.media_url || "/placeholder.svg"}
          alt={`Instagram post`}
          className="max-h-[50vh] md:max-h-full w-full object-contain"
        />
      </div>

      {/* Post Details */}
      <div className="flex flex-col flex-grow w-full md:w-[40%] bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClosePost}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Comments Section */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {/* Caption */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 border">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <span className="font-semibold text-sm">Instagram User</span>{" "}
                <span className="text-sm">{post.caption || "No caption"}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {formatTimestamp(post.timestamp)}
              </div>
            </div>
          </div>

          {/* Comments */}
          {post.comments &&
            post.comments.map((comment) => (
              <div key={comment._id} className="space-y-3">
                {/* Parent comment */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage
                      src={
                        comment.avatar_url ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={comment.username}
                    />
                    <AvatarFallback>
                      {comment.username
                        ? comment.username[0].toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div>
                      <span className="font-semibold text-sm">
                        {comment.username}
                      </span>{" "}
                      <span className="text-sm">{comment.text}</span>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                      <button className="text-xs font-semibold">Balas</button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-10 space-y-3 border-l-2 border-muted ml-4">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="flex gap-3">
                        <Avatar className="h-7 w-7 border">
                          <AvatarImage
                            src={
                              reply.avatar_url ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={reply.username}
                          />
                          <AvatarFallback>
                            {reply.username
                              ? reply.username[0].toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div>
                            <span className="font-semibold text-sm">
                              {reply.username}
                            </span>{" "}
                            <span className="text-sm">{reply.text}</span>
                          </div>
                          <div className="flex gap-4 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(reply.timestamp)}
                            </span>
                            <button className="text-xs font-semibold">
                              Balas
                            </button>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Heart className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Actions */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Bookmark className="h-6 w-6" />
            </Button>
          </div>
          <div className="font-semibold text-sm mb-1">
            {post.like_count.toLocaleString()} suka
          </div>
          <div className="text-xs text-muted-foreground mb-4">
            {formatTimestamp(post.timestamp)}
          </div>

          {/* Comment Input */}
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/placeholder.svg" alt="Your profile" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Tambahkan komentar..."
              className="flex-1 bg-transparent border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            {commentText && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 font-semibold"
              >
                Kirim
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-4 px-2 md:px-4 max-w-screen-xl">
      {/* Header for mobile */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">My Instagram Feed</h1>
        </div>
      </div>

      {/* Header for desktop */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Instagram Feed</h1>
        <Tabs defaultValue="all" className="w-[300px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="photos">Foto</TabsTrigger>
            <TabsTrigger value="videos">Video</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.media_id} className="aspect-square relative group">
              {isDesktop ? (
                <Dialog>
                  <DialogTrigger>
                    <div className="cursor-pointer h-full">
                      <img
                        src={post.media_url || "/placeholder.svg"}
                        alt="Instagram post"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-4 text-white">
                          <div className="flex items-center gap-1">
                            <Heart className="h-5 w-5 fill-white" />
                            <span className="font-semibold">
                              {post.like_count}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-5 w-5 fill-white" />
                            <span className="font-semibold">
                              {post.comments_count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="max-w-5xl p-0"
                    onInteractOutside={handleClosePost}
                  >
                    <DialogTitle>
                      <VisuallyHidden>Instagram Post</VisuallyHidden>
                    </DialogTitle>
                    <PostContent post={post} />
                  </DialogContent>
                </Dialog>
              ) : (
                <Drawer>
                  <DrawerTrigger onClick={() => setSelectedPost(post)}>
                    <div className="cursor-pointer h-full">
                      <img
                        src={post.media_url || "/placeholder.svg"}
                        alt="Instagram post"
                        className="object-cover w-full h-full"
                      />
                      {post.comments_count > 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant="secondary"
                            className="bg-white text-black"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {post.comments_count}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="p-0 max-h-[90vh]">
                    {selectedPost && <PostContent post={selectedPost} />}
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 py-20 text-center text-muted-foreground">
            No Instagram posts found. Please check your connection.
          </div>
        )}
      </div>
    </div>
  );
}
