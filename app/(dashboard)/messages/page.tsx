"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockConversations = [
  {
    id: 1,
    username: "fashion_lover",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the info! I'll check it out.",
    timestamp: "2h ago",
    unread: true,
  },
  {
    id: 2,
    username: "travel_enthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The Sony A7III. It's amazing for low light!",
    timestamp: "5h ago",
    unread: false,
  },
  {
    id: 3,
    username: "fitness_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you! I appreciate the support.",
    timestamp: "1d ago",
    unread: false,
  },
  {
    id: 4,
    username: "food_critic",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll DM you the recipe tomorrow!",
    timestamp: "2d ago",
    unread: false,
  },
  {
    id: 5,
    username: "art_lover",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That means a lot, thank you so much!",
    timestamp: "3d ago",
    unread: false,
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "fashion_lover",
    content:
      "Hi there! I love your latest post with that outfit. Where did you get it from?",
    timestamp: "2 days ago",
    isUser: false,
  },
  {
    id: 2,
    sender: "me",
    content:
      "Thank you! The dress is from Zara's summer collection and the accessories are from a local boutique.",
    timestamp: "2 days ago",
    isUser: true,
  },
  {
    id: 3,
    sender: "fashion_lover",
    content: "It looks amazing on you! Do they ship internationally?",
    timestamp: "1 day ago",
    isUser: false,
  },
  {
    id: 4,
    sender: "me",
    content:
      "Yes, they do! You can check their website at zara.com. They have worldwide shipping options.",
    timestamp: "1 day ago",
    isUser: true,
  },
  {
    id: 5,
    sender: "fashion_lover",
    content: "Perfect! I'll take a look right away.",
    timestamp: "1 day ago",
    isUser: false,
  },
  {
    id: 6,
    sender: "fashion_lover",
    content: "Just ordered it! Can't wait for it to arrive.",
    timestamp: "5 hours ago",
    isUser: false,
  },
  {
    id: 7,
    sender: "me",
    content:
      "That's great! I'm sure you'll love it. Let me know how it fits when you get it!",
    timestamp: "4 hours ago",
    isUser: true,
  },
  {
    id: 8,
    sender: "fashion_lover",
    content: "Thanks for the info! I'll check it out.",
    timestamp: "2 hours ago",
    isUser: false,
  },
];

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<
    (typeof mockConversations)[0] | null
  >(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSelectConversation = (
    conversation: (typeof mockConversations)[0]
  ) => {
    // Mark as read when selected
    setConversations(
      conversations.map((c) =>
        c.id === conversation.id ? { ...c, unread: false } : c
      )
    );
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        content: newMessage,
        timestamp: "Just now",
        isUser: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      toast.success("Message sent");
    }
  };

  // if (!user?.connected) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Connect Your Account</CardTitle>
  //         <CardDescription>
  //           You need to connect your Instagram account to view and manage direct messages
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <Button onClick={() => (window.location.href = "/connect-account")}>Connect Account</Button>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
          <CardDescription>Your direct message conversations</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            {conversations.map((conversation) => (
              <div key={conversation.id}>
                <button
                  className={`flex w-full items-center gap-3 p-3 text-left hover:bg-muted/50 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-muted"
                      : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage
                        src={conversation.avatar || "/placeholder.svg"}
                        alt={conversation.username}
                      />
                      <AvatarFallback>
                        {conversation.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.unread && (
                      <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">@{conversation.username}</p>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </button>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="flex flex-col md:col-span-2">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b p-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.username}
                  />
                  <AvatarFallback>
                    {selectedConversation.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">
                    @{selectedConversation.username}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Active now
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <CardContent className="border-t p-3">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6">
            <div className="rounded-full bg-muted p-6">
              <Send className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Your Messages</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Select a conversation to view and reply to messages
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
