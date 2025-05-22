"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Info, Send } from "lucide-react";

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    username: "fashion_lover",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the info! I'll check it out.",
    timestamp: "2h ago",
    active: false,
  },
  {
    id: 2,
    username: "travel_enthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The Sony A7III. It's amazing for low light!",
    timestamp: "5h ago",
    active: false,
  },
  {
    id: 3,
    username: "fitness_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you! I appreciate the support.",
    timestamp: "1d ago",
    active: false,
  },
  {
    id: 4,
    username: "food_critic",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll DM you the recipe tomorrow!",
    timestamp: "2d ago",
    active: false,
  },
];

// Mock messages for a conversation
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
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<
    (typeof mockConversations)[0] | null
  >(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("immafckcre");

  const handleSelectConversation = (
    conversation: (typeof mockConversations)[0]
  ) => {
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
    }
  };

  return (
    <div className="flex h-[90vh] bg-black text-white overflow-hidden">
      <div className="w-[450px] border-r border-gray-800 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">{username}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <Edit className="h-6 w-6" />
        </div>

        {/* Fixed Search */}
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <Input
              placeholder="Search"
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-full h-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        {/* Scrollable Conversations List */}
        <div className="overflow-y-auto flex-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-gray-900 ${
                selectedConversation?.id === conversation.id
                  ? "bg-gray-900"
                  : ""
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <Avatar className="h-12 w-12 border border-gray-700">
                <AvatarImage
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.username}
                />
                <AvatarFallback>
                  {conversation.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium truncate">
                    @{conversation.username}
                  </p>
                  <span className="text-xs text-gray-400">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - Always the same width */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Fixed Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-gray-700">
                  <AvatarImage
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.username}
                  />
                  <AvatarFallback>
                    {selectedConversation.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    @{selectedConversation.username}
                  </p>
                  <p className="text-xs text-gray-400">Active now</p>
                </div>
              </div>
              <Info className="h-6 w-6 text-gray-400" />
            </div>

            {/* Scrollable Messages - Fixed height to ensure input is visible */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ height: "calc(100vh - 132px)" }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser ? "bg-blue-600" : "bg-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-right text-xs text-gray-400">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Fixed Message Input - Always visible */}
            <div className="border-t border-gray-800 p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-full"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex h-full w-[550px] flex-col items-center justify-center p-6">
            <div className="rounded-full bg-gray-800 p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-gray-400"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-medium">Your messages</h3>
            <p className="mt-2 text-center text-gray-400">
              Send private photos and messages to a friend or group.
            </p>
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Send message
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
