"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Facebook,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider"; // Using the exact import path from the original code
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
import { FacebookPagesModal } from "@/components/facebook-pages-modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

type FacebookPage = {
  page_id: string;
  page_name: string;
  fb_user_id: string;
  ig_id: string;
  is_selected: boolean;
};

export default function ConnectAccountPage() {
  const { disconnectPage, facebookPage, instagramProfile } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [facebookPages, setFacebookPages] = useState<FacebookPage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const clientId = process.env.NEXT_PUBLIC_META_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_META_REDIRECT_URI!
    );

    const loginUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    // Redirect user ke Facebook OAuth
    window.location.href = loginUrl;
  };

  const handleDisconnect = () => {
    if (facebookPage) {
      disconnectPage();
      toast.success("Facebook Page disconnected");
    }
  };

  useEffect(() => {
    const checkSuccessAndFetch = async () => {
      const url = new URL(window.location.href);
      const successFlag = url.searchParams.get("success");

      if (successFlag === "true") {
        try {
          setIsConnecting(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/facebook-pages`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch Facebook pages");
          }

          const data = await res.json();

          // Format the Facebook pages data
          if (data.facebookPages && Array.isArray(data.facebookPages)) {
            const formattedPages = data.facebookPages.map((page: any) => ({
              ...page,
              is_selected: page.is_selected || false,
            }));

            setFacebookPages(formattedPages);

            // Open the modal to select pages
            setIsModalOpen(true);
          } else {
            toast.error("No Instagram business accounts found");
          }
        } catch (error) {
          console.error("Failed to fetch facebook pages:", error);
          toast.error("Failed to fetch Instagram business accounts");
        } finally {
          setIsConnecting(false);
        }

        // Remove success flag from URL to prevent triggering again on reload
        url.searchParams.delete("success");
        window.history.replaceState({}, "", url.pathname);
      }
    };

    checkSuccessAndFetch();
  }, []);

  useEffect(() => {
    console.log("Facebook page state:", facebookPage);
  }, [facebookPage]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connect Instagram Account</CardTitle>
            <CardDescription>
              Link your Instagram business account to manage comments, messages,
              and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {facebookPage ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={"/placeholder.svg"}
                      // alt={user.name}
                    />
                    <AvatarFallback>{facebookPage.page_name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{facebookPage.page_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Page ID: {facebookPage.page_id}
                    </p>
                  </div>
                </div>

                {/* Instagram Profile Section */}
                {instagramProfile && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-medium mb-4">
                      Connected Instagram Account
                    </h4>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={
                            instagramProfile.profilePictureUrl ||
                            "/placeholder.svg"
                          }
                          alt={instagramProfile.username}
                        />
                        <AvatarFallback>
                          {instagramProfile.username?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          @{instagramProfile.username}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {instagramProfile.followersCount && (
                            <span>
                              {instagramProfile.followersCount.toLocaleString()}{" "}
                              followers
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" onClick={handleDisconnect}>
                    Disconnect Page
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
                    Connect your Instagram business account via Facebook to
                    manage your social media presence
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

      <div className="grid sm:grid-cols-1">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Why Connect via Facebook */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Why Connect Instagram via Facebook?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Instagram API Requirements
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Instagram's API requires business accounts to be connected
                    to a Facebook page. This is Meta's official requirement for
                    accessing Instagram's business features.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Access to Business Features
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Connecting via Facebook gives you access to analytics,
                    automated responses, and the ability to manage comments and
                    messages from our platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Prerequisites Alert */}
            <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-400">
                Prerequisites
              </AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-300">
                Before connecting, you must have a Facebook Page linked to your
                Instagram Business account.
              </AlertDescription>
            </Alert>

            {/* Step by Step Guide */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Step-by-Step Connection Guide
              </h3>

              <div className="border rounded-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step-1">
                    <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 text-xs font-bold">
                          1
                        </div>
                        <span>Convert to Instagram Business Account</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-9 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          If you haven't already, convert your Instagram account
                          to a Business account:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                          <li>Open Instagram app and go to your profile</li>
                          <li>
                            Tap the hamburger menu (≡) and select Settings
                          </li>
                          <li>
                            Tap Account, then scroll to "Switch to Professional
                            Account"
                          </li>
                          <li>Select "Business" and follow the prompts</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-2">
                    <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 text-xs font-bold">
                          2
                        </div>
                        <span>Create a Facebook Page</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-9 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          If you don't have a Facebook Page yet:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                          <li>Go to facebook.com and log in to your account</li>
                          <li>
                            Click the "+" icon in the top right and select
                            "Page"
                          </li>
                          <li>Enter your Page name and category</li>
                          <li>Add a profile picture and cover photo</li>
                          <li>Click "Create Page"</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-3">
                    <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 text-xs font-bold">
                          3
                        </div>
                        <span>Link Instagram to Facebook Page</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-9 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Connect your Instagram Business account to your
                          Facebook Page:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                          <li>Go to your Facebook Page</li>
                          <li>
                            Click "Settings" at the bottom of the left sidebar
                          </li>
                          <li>Select "Instagram" from the left menu</li>
                          <li>
                            Click "Connect Account" and enter your Instagram
                            login details
                          </li>
                          <li>Follow the prompts to complete the connection</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-4">
                    <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 text-xs font-bold">
                          4
                        </div>
                        <span>Connect to Our Platform</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="pl-9 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Now you're ready to connect to our platform:
                        </p>
                        <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                          <li>
                            Return to our platform and click "Connect via
                            Facebook"
                          </li>
                          <li>Log in to Facebook if prompted</li>
                          <li>
                            Select the Facebook Page that's linked to your
                            Instagram account
                          </li>
                          <li>Review and accept the permissions</li>
                          <li>
                            Your Instagram Business account will now be
                            connected!
                          </li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Common Issues & Troubleshooting
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    No Instagram Business Account
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    If you don't see your Instagram account, make sure it's
                    converted to a Business account and properly linked to your
                    Facebook Page.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Permission Issues
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure you're an admin of the Facebook Page and that you've
                    granted all the necessary permissions during the connection
                    process.
                  </p>
                </div>
              </div>
            </div>

            {/* Help Resources */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-sm">Need More Help?</h4>
                  <p className="text-xs text-muted-foreground">
                    Visit our help center for detailed guides
                  </p>
                </div>
              </div>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                Help Center <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <FacebookPagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pages={facebookPages}
      />
    </div>
  );
}
