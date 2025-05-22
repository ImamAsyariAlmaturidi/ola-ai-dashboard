"use client";

import type React from "react";

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
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  X,
  ChevronLeft,
  Camera,
} from "lucide-react";

// Mock data for posts
const mockPosts = [
  {
    id: "post1",
    username: "outfitlocal.idn_",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    image: "/placeholder.svg?height=600&width=600",
    caption:
      "Ide inspirasi outfit kece nih, jangan lupa save dulu aja buat referensi..",
    hashtags:
      "#inspirasioutfit #outfitcowok #ootdcowok #baggyjeans #baggypants #kaosboxy #boxytshirt",
    likes: 1245,
    timestamp: "2w",
    location: "Fashion District",
    comments: [
      {
        id: "c1",
        username: "nothing.in.www",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "What's the site on the background?",
        timestamp: "1 minggu",
        likes: 0,
      },
      {
        id: "c2",
        username: "t0kt0r0v",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "@nothing.in.www @beefocus.su",
        timestamp: "1 minggu",
        likes: 1,
        isCreator: true,
      },
      {
        id: "c3",
        username: "m.man9our",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "🔥 🔥 🔥",
        timestamp: "4 minggu",
        likes: 0,
      },
      {
        id: "c4",
        username: "hubble.in.orbit",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "Exactly ! Keep going bro!",
        timestamp: "11 minggu",
        likes: 5,
        likedByCreator: true,
      },
    ],
  },
  {
    id: "post2",
    username: "codinglife",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    image: "/placeholder.svg?height=600&width=600",
    caption: "Late night coding session. Building something cool!",
    hashtags: "#coding #developer #programming #webdev",
    likes: 876,
    timestamp: "1d",
    location: "Tech Hub",
    comments: [
      {
        id: "c5",
        username: "dev_enthusiast",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "What are you working on?",
        timestamp: "23h",
        likes: 2,
      },
      {
        id: "c6",
        username: "codinglife",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "@dev_enthusiast A new social media app!",
        timestamp: "22h",
        likes: 1,
        isCreator: true,
      },
    ],
  },
  {
    id: "post3",
    username: "fashionista",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    image: "/placeholder.svg?height=600&width=600",
    caption: "New collection just dropped! What do you think?",
    hashtags: "#fashion #style #newcollection #trendy",
    likes: 2341,
    timestamp: "5h",
    location: "Fashion Week",
    comments: [
      {
        id: "c7",
        username: "style_lover",
        userAvatar: "/placeholder.svg?height=40&width=40",
        comment: "Absolutely stunning! Where can I buy this?",
        timestamp: "4h",
        likes: 15,
      },
    ],
  },
  {
    id: "post4",
    username: "travel_addict",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    image: "/placeholder.svg?height=600&width=600",
    caption: "Paradise found! Best vacation ever.",
    hashtags: "#travel #vacation #beach #paradise",
    likes: 1532,
    timestamp: "3d",
    location: "Bali, Indonesia",
    comments: [],
  },
  {
    id: "post5",
    username: "fitness_guru",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    image: "/placeholder.svg?height=600&width=600",
    caption: "Morning workout routine. Stay consistent!",
    hashtags: "#fitness #workout #motivation #health",
    likes: 987,
    timestamp: "12h",
    location: "Fitness Center",
    comments: [],
  },
  {
    id: "post6",
    username: "tech_reviewer",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    image: "/placeholder.svg?height=600&width=600",
    caption: "Unboxing the latest smartphone. Full review coming soon!",
    hashtags: "#tech #gadgets #smartphone #review",
    likes: 654,
    timestamp: "2d",
    location: "Tech Studio",
    comments: [],
  },
  {
    id: "post7",
    username: "food_lover",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    image: "/placeholder.svg?height=600&width=600",
    caption: "Homemade pasta with fresh ingredients. Delicious!",
    hashtags: "#food #cooking #homemade #pasta",
    likes: 1245,
    timestamp: "1d",
    location: "Home Kitchen",
    comments: [],
  },
  {
    id: "post8",
    username: "art_gallery",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    image: "/placeholder.svg?height=600&width=600",
    caption: "New exhibition opening this weekend. Don't miss it!",
    hashtags: "#art #exhibition #gallery #contemporary",
    likes: 543,
    timestamp: "4d",
    location: "Modern Art Gallery",
    comments: [],
  },
  {
    id: "post9",
    username: "music_producer",
    userAvatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    image: "/placeholder.svg?height=600&width=600",
    caption: "Working on a new track. Stay tuned!",
    hashtags: "#music #producer #studio #newmusic",
    likes: 876,
    timestamp: "6h",
    location: "Recording Studio",
    comments: [],
  },
];

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <span className="sr-only">{children}</span>;
};

export default function InstagramGridFeed() {
  const [selectedPost, setSelectedPost] = useState<
    (typeof mockPosts)[0] | null
  >(null);
  const [commentText, setCommentText] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClosePost = () => {
    setSelectedPost(null);
    setCommentText("");
  };

  const PostContent = ({ post }: { post: (typeof mockPosts)[0] }) => (
    <div className="flex flex-col h-full md:flex-row md:h-[80vh]">
      {/* Post Image */}
      <div className="relative bg-black flex-shrink-0 md:w-[60%] flex items-center justify-center">
        <img
          src={post.image || "/placeholder.svg"}
          alt={`Post by ${post.username}`}
          className="max-h-[50vh] md:max-h-full w-full object-contain"
        />
      </div>

      {/* Post Details */}
      <div className="flex flex-col flex-grow w-full md:w-[40%] bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border">
              <AvatarImage
                src={post.userAvatar || "/placeholder.svg"}
                alt={post.username}
              />
              <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="font-semibold text-sm">{post.username}</span>
              {post.verified && (
                <span className="ml-1 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          </div>
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
                src={post.userAvatar || "/placeholder.svg"}
                alt={post.username}
              />
              <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <span className="font-semibold text-sm">{post.username}</span>{" "}
                <span className="text-sm">{post.caption}</span>
              </div>
              <div className="mt-1 text-sm text-blue-500">{post.hashtags}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {post.timestamp}
              </div>
            </div>
          </div>

          {/* Comments */}
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarImage
                  src={comment.userAvatar || "/placeholder.svg"}
                  alt={comment.username}
                />
                <AvatarFallback>
                  {comment.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div>
                  <span className="font-semibold text-sm">
                    {comment.username}
                  </span>{" "}
                  {comment.isCreator && (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-normal py-0 h-4"
                    >
                      Pembuat
                    </Badge>
                  )}{" "}
                  <span className="text-sm">{comment.comment}</span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                  {comment.likes > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {comment.likes} suka
                    </span>
                  )}
                  <button className="text-xs font-semibold">Balas</button>
                </div>
                {comment.likedByCreator && (
                  <div className="mt-1 text-xs text-red-500">
                    ❤️ oleh pembuat
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-3 w-3" />
              </Button>
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
            {post.likes.toLocaleString()} suka
          </div>
          <div className="text-xs text-muted-foreground mb-4">
            {post.timestamp}
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
        {mockPosts.map((post) => (
          <div key={post.id} className="aspect-square relative group">
            {isDesktop ? (
              <Dialog>
                <DialogTrigger>
                  <div className="cursor-pointer h-full">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Post by ${post.username}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1">
                          <Heart className="h-5 w-5 fill-white" />
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-5 w-5 fill-white" />
                          <span className="font-semibold">
                            {post.comments.length}
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
                    <VisuallyHidden>Post by {post.username}</VisuallyHidden>
                  </DialogTitle>
                  <PostContent post={post} />
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer>
                <DrawerTrigger onClick={() => setSelectedPost(post)}>
                  <div className="cursor-pointer h-full">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Post by ${post.username}`}
                      className="object-cover w-full h-full"
                    />
                    {post.comments.length > 0 && (
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-white text-black"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.comments.length}
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
        ))}
      </div>
    </div>
  );
}
