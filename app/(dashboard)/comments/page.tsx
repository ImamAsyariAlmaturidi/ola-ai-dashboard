"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MoreHorizontal, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockComments = [
  {
    id: 1,
    username: "fashion_lover",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "This is absolutely stunning! Where can I get this outfit? 😍",
    timestamp: "2h ago",
    postId: "post123",
  },
  {
    id: 2,
    username: "travel_enthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "The lighting in this photo is perfect! What camera do you use?",
    timestamp: "5h ago",
    postId: "post456",
  },
  {
    id: 3,
    username: "fitness_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "Great content as always! Keep it up 💪",
    timestamp: "1d ago",
    postId: "post789",
  },
  {
    id: 4,
    username: "food_critic",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "This looks delicious! What's the recipe?",
    timestamp: "2d ago",
    postId: "post101",
  },
  {
    id: 5,
    username: "art_lover",
    avatar: "/placeholder.svg?height=40&width=40",
    comment: "Your aesthetic is everything! So inspiring ✨",
    timestamp: "3d ago",
    postId: "post202",
  },
];

export default function CommentsPage() {
  const { user } = useAuth();
  const [comments, setComments] = useState(mockComments);
  const [replyText, setReplyText] = useState("");
  const [selectedComment, setSelectedComment] = useState<
    (typeof mockComments)[0] | null
  >(null);

  const handleReply = () => {
    if (replyText.trim() && selectedComment) {
      toast.success(`Reply sent to @${selectedComment.username}`);
      setReplyText("");
      setSelectedComment(null);
    }
  };

  const handleLike = (commentId: number) => {
    toast.success("Comment liked");
  };

  const handleDelete = (commentId: number) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    toast.success("Comment deleted");
  };

  // if (!user?.connected) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Connect Your Account</CardTitle>
  //         <CardDescription>You need to connect your Instagram account to view and manage comments</CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <Button onClick={() => (window.location.href = "/connect-account")}>Connect Account</Button>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
          <CardDescription>
            View and respond to comments on your Instagram posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Post</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.avatar || "/placeholder.svg"}
                          alt={comment.username}
                        />
                        <AvatarFallback>{comment.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">@{comment.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {comment.postId}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate md:max-w-md">
                    {comment.comment}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedComment(comment)}
                          >
                            <Reply className="h-4 w-4" />
                            <span className="sr-only">Reply</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reply to Comment</DialogTitle>
                            <DialogDescription>
                              Responding to @{selectedComment?.username}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-start gap-4 py-4">
                            <Avatar className="mt-1">
                              <AvatarImage
                                src={
                                  selectedComment?.avatar || "/placeholder.svg"
                                }
                                alt={selectedComment?.username}
                              />
                              <AvatarFallback>
                                {selectedComment?.username[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div>
                                <span className="font-medium">
                                  @{selectedComment?.username}
                                </span>
                                <span className="ml-2 text-xs text-muted-foreground">
                                  {selectedComment?.timestamp}
                                </span>
                              </div>
                              <p className="text-sm">
                                {selectedComment?.comment}
                              </p>
                            </div>
                          </div>
                          <Textarea
                            placeholder="Type your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setSelectedComment(null)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleReply}>Send Reply</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(comment.id)}
                      >
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDelete(comment.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comment Filters</CardTitle>
          <CardDescription>
            Set up filters to automatically hide or flag certain comments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="Add keyword to filter..."
                className="flex-1"
              />
              <Button>Add Filter</Button>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Active Filters</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                  <span>spam</span>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                  <span>inappropriate</span>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                  <span>offensive</span>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
