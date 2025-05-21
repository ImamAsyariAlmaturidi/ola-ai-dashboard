"use client";

import {
  Facebook,
  Instagram,
  RefreshCw,
  Link2,
  Users,
  BarChart2,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConnectAccountCardProps {
  facebookPage: {
    page_name: string;
    page_id: string;
  } | null;
  instagramProfile: {
    username: string;
    followersCount: number;
    profilePictureUrl?: string;
  } | null;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefresh: () => void;
  isConnecting: boolean;
}

export default function ConnectAccountCard({
  facebookPage,
  instagramProfile,
  onConnect,
  onDisconnect,
  onRefresh,
  isConnecting,
}: ConnectAccountCardProps) {
  const isConnected = !!facebookPage;

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Instagram className="h-6 w-6" />
              Connect Instagram Account
            </CardTitle>
            <p className="mt-1 text-sm text-white/80">
              Link your Instagram business account to manage comments, messages,
              and analytics
            </p>
          </div>
          {isConnected && (
            <Badge
              variant="outline"
              className="bg-white/20 text-white border-white/30 px-3 py-1"
            >
              Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isConnected ? (
          <div className="space-y-8">
            {/* Facebook Page Section */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={facebookPage?.page_name}
                      />
                      <AvatarFallback className="bg-blue-500 text-white text-lg">
                        {facebookPage?.page_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                      <Facebook className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {facebookPage?.page_name}
                      </h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Facebook Page</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-muted-foreground bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        ID: {facebookPage?.page_id}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded">
                  <Facebook className="h-3 w-3" />
                  <span>Facebook Page</span>
                </div>
              </div>
            </div>

            {/* Instagram Account Section */}
            {instagramProfile && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                        <AvatarImage
                          src={
                            instagramProfile.profilePictureUrl ||
                            "/placeholder.svg"
                          }
                          alt={instagramProfile.username}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg">
                          {instagramProfile.username?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-1 rounded-full">
                        <Instagram className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          @{instagramProfile.username}
                        </h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                              >
                                <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Instagram Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>
                            {instagramProfile.followersCount.toLocaleString()}{" "}
                            followers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950 px-2 py-1 rounded">
                    <Instagram className="h-3 w-3" />
                    <span>Instagram Business</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-500 mb-2" />
                <span className="text-sm font-medium">Comments & DMs</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <BarChart2 className="h-6 w-6 text-pink-500 mb-2" />
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium">Auto-Replies</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                onClick={onDisconnect}
              >
                Disconnect Account
              </Button>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                onClick={onRefresh}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Connection
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-8 px-4">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center">
                <Instagram className="h-10 w-10 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                <Facebook className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Connect Your Instagram Business Account
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Link your Instagram business account via Facebook to manage
              comments, messages, and gain valuable insights
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
              onClick={onConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect via Facebook"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
