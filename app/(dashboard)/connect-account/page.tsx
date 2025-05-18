"use client";

import { useEffect, useState } from "react";
import { Facebook } from "lucide-react";
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
import { toast } from "sonner";

export default function ConnectAccountPage() {
  const { user, connectInstagram } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);

    const state = localStorage.getItem("access_token");
    if (!state) {
      toast.error("Please login to continue");
      setIsConnecting(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }
    const scope = encodeURIComponent("instagram_basic,pages_show_list");
    const clientId = process.env.META_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.META_REDIRECT_URI!);

    const loginUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    // Redirect user ke Facebook OAuth
    window.location.href = loginUrl;
    // setTimeout(() => {
    //   connectInstagram(true, "IG12345678");
    //   setIsConnecting(false);
    //   toast.success("Instagram account connected successfully!");
    // }, 1500);
  };

  const handleDisconnect = () => {
    connectInstagram(false);
    toast.success("Instagram account disconnected");
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const successFlag = url.searchParams.get("success");

    if (successFlag === "true") {
      // panggil API user/me untuk dapat data user terbaru
      fetch("/api/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // sesuaikan dengan cara kamu simpan token
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // update context state untuk connected Instagram dan accountId misal
          connectInstagram(true, data.accountId);
        })
        .catch(() => {
          // error handling bisa ditambahin disini
        });

      // hapus flag success dari URL biar gak trigger lagi pas reload
      url.searchParams.delete("success");
      window.history.replaceState({}, "", url.pathname);
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connect Instagram Account</CardTitle>
          <CardDescription>
            Link your Instagram business account to manage comments, messages,
            and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user?.connected ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.username}
                  />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">@{user.username}</h3>
                  <p className="text-sm text-muted-foreground">
                    Account ID: {user.accountId}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={handleDisconnect}>
                  Disconnect Account
                </Button>
                <Button variant="outline">Refresh Connection</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-full bg-muted p-6">
                <Facebook className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Connect Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your Instagram business account via Facebook to manage
                  your social media presence
                </p>
              </div>
              <Button
                className="w-full sm:w-auto"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting
                  ? "Connecting..."
                  : "Connect Instagram via Facebook"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connection Benefits</CardTitle>
          <CardDescription>
            What you can do after connecting your Instagram account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Manage Comments</h4>
                <p className="text-sm text-muted-foreground">
                  View and respond to comments on your posts
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Direct Messages</h4>
                <p className="text-sm text-muted-foreground">
                  Read and reply to direct messages
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  View insights and performance metrics
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Automated Responses</h4>
                <p className="text-sm text-muted-foreground">
                  Set up auto-replies for common questions
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
