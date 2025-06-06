"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type InstagramProfile, useAuth } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  ChevronRight,
  DollarSign,
  Heart,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Users,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { getInstagramProfile } from "@/app/actions/instagramService";

// Mock data
const stats = {
  followers: 12458,
  followersGrowth: 5.2,
  engagement: 3.8,
  engagementGrowth: 1.2,
  impressions: 45720,
  impressionsGrowth: 12.5,
  reach: 28450,
  reachGrowth: 8.3,
  commentsToday: 24,
  dmsToday: 12,
  totalPosts: 156,
  conversionRate: 2.4,
  conversionGrowth: 0.5,
};

const recentPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=80&width=80",
    likes: 1245,
    comments: 89,
    date: "2 days ago",
    engagement: 4.8,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=80&width=80",
    likes: 982,
    comments: 67,
    date: "5 days ago",
    engagement: 3.9,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=80&width=80",
    likes: 876,
    comments: 54,
    date: "1 week ago",
    engagement: 3.2,
  },
];

const campaigns = [
  {
    id: 1,
    name: "Summer Collection",
    status: "Active",
    reach: 15240,
    engagement: 4.2,
    conversion: 2.8,
    roi: 3.5,
  },
  {
    id: 2,
    name: "Product Launch",
    status: "Scheduled",
    reach: 0,
    engagement: 0,
    conversion: 0,
    roi: 0,
  },
  {
    id: 3,
    name: "Spring Sale",
    status: "Completed",
    reach: 28450,
    engagement: 5.1,
    conversion: 3.2,
    roi: 4.2,
  },
];

export default function qDashboardPage() {
  const { user, instagramProfile, setInstagramProfile } = useAuth();
  const [timeframe, setTimeframe] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        setIsLoading(true);
        const profile = (await getInstagramProfile(token!)) as InstagramProfile;

        if (profile) {
          profile.connected = true;
          setInstagramProfile(profile);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching Instagram profile:", error);
        setError("Failed to load profile data");
      } finally {
        // Add a small delay to prevent flickering for fast connections
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }

    if (!instagramProfile) {
      fetchProfile();
    } else {
      console.log("Using existing Instagram profile:", instagramProfile);
      setIsLoading(false);
    }
  }, [instagramProfile, setInstagramProfile]);

  // Default Instagram profile data for preview
  const dummyProfile = {
    username: "instagram_business",
    profilePictureUrl: "/placeholder.svg?height=80&width=80",
    followersCount: 12458,
    connected: false,
    accountId: "IG12345678",
  };

  // Use Instagram profile data when available, fallback to dummy data for missing fields
  const profileData = {
    username: instagramProfile?.username || dummyProfile.username,
    profilePictureUrl:
      instagramProfile?.profile_picture_url || dummyProfile.profilePictureUrl,
    followersCount:
      instagramProfile?.followers_count || dummyProfile.followersCount,
    connected: instagramProfile?.connected || dummyProfile.connected,
    accountId: instagramProfile?.ig_id || dummyProfile.accountId,
  };

  return (
    <div className="space-y-6">
      {/* Business Overview Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Business Dashboard
          </h1>
          <p className="text-muted-foreground">
            Analytics and insights for your Instagram business account
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            defaultValue="week"
            className="w-[250px]"
            onValueChange={setTimeframe}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Account Status Card */}
      <Card className="overflow-hidden border-none bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <CardHeader className="pb-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </>
              ) : (
                <>
                  <CardTitle className="text-2xl">
                    Welcome, @{profileData.username}
                  </CardTitle>
                  <CardDescription>
                    Here's what's happening with your Instagram business account
                  </CardDescription>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : profileData.connected ? (
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Connected</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    <span>Not Connected</span>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="ml-2"
                    onClick={() => (window.location.href = "/connect-account")}
                  >
                    Connect Now
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {isLoading ? (
              <Skeleton className="h-20 w-20 rounded-full" />
            ) : (
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage
                  src={profileData.profilePictureUrl || "/placeholder.svg"}
                  alt={profileData.username}
                />
                <AvatarFallback>{profileData.username[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Followers
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold">
                      {profileData.followersCount.toLocaleString()}
                    </p>
                    <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-0.5 h-3 w-3" />
                      {stats.followersGrowth}%
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Engagement
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold">{stats.engagement}%</p>
                    <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-0.5 h-3 w-3" />
                      {stats.engagementGrowth}%
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Impressions
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold">
                      {stats.impressions.toLocaleString()}
                    </p>
                    <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-0.5 h-3 w-3" />
                      {stats.impressionsGrowth}%
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Reach
                </p>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold">
                      {stats.reach.toLocaleString()}
                    </p>
                    <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="mr-0.5 h-3 w-3" />
                      {stats.reachGrowth}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0 text-sm" asChild>
            <Link href="/analytics">
              View detailed analytics <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Business Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-2 w-full" />
                  </CardContent>
                </Card>
              ))
          : [
              {
                title: "Engagement Rate",
                icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
                value: `${stats.engagement}%`,
                change: `+${stats.engagementGrowth}%`,
                progress: stats.engagement * 10,
              },
              {
                title: "Conversion Rate",
                icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
                value: `${stats.conversionRate}%`,
                change: `+${stats.conversionGrowth}%`,
                progress: stats.conversionRate * 10,
              },
              {
                title: "Audience Growth",
                icon: <Users className="h-4 w-4 text-muted-foreground" />,
                value: `+${stats.followersGrowth}%`,
                change: `+${Math.round(
                  stats.followers * (stats.followersGrowth / 100)
                )} new followers`,
                progress: stats.followersGrowth * 5,
              },
              {
                title: "Estimated Revenue",
                icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
                value: "$1,245",
                change: "+12.5%",
                progress: 62.5,
              },
            ].map((metric, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  {metric.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 dark:text-green-400">
                      {metric.change}
                    </span>{" "}
                    from last {timeframe}
                  </p>
                  <div className="mt-3">
                    <Progress value={metric.progress} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Marketing Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Marketing Campaigns</CardTitle>
              <CardDescription>
                Track your campaign performance and ROI
              </CardDescription>
            </div>
            <Button size="sm">Create Campaign</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-6">
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </div>
                  ))
              : campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex flex-col justify-between gap-2 rounded-lg border p-4 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            campaign.status === "Active"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : campaign.status === "Scheduled"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {campaign.status === "Scheduled"
                          ? "Starts in 3 days"
                          : `Reach: ${campaign.reach.toLocaleString()} impressions`}
                      </p>
                    </div>
                    {campaign.status !== "Scheduled" && (
                      <div className="flex flex-wrap gap-3 sm:gap-6">
                        <div className="text-center">
                          <p className="text-xs font-medium text-muted-foreground">
                            Engagement
                          </p>
                          <p className="text-sm font-bold">
                            {campaign.engagement}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-muted-foreground">
                            Conversion
                          </p>
                          <p className="text-sm font-bold">
                            {campaign.conversion}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-muted-foreground">
                            ROI
                          </p>
                          <p className="text-sm font-bold">{campaign.roi}x</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          View Details
                        </Button>
                      </div>
                    )}
                    {campaign.status === "Scheduled" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="default" size="sm">
                          Launch Now
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Performance */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>
              Your posts with the highest engagement rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-4 w-12" />
                          </div>
                          <div className="flex gap-4">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-2 w-full" />
                        </div>
                      </div>
                    ))
                : recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post thumbnail"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Post #{post.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {post.date}
                          </p>
                        </div>
                        <div className="mt-1 flex gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">
                              {post.likes.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">
                              {post.engagement}% engagement
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress
                            value={post.engagement * 10}
                            className="h-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="px-0 text-sm" asChild>
              <Link href="/analytics">
                View all content performance{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Insights</CardTitle>
            <CardDescription>
              Your audience demographics and behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-8" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-8" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Age Groups</p>
                    <p className="text-xs text-muted-foreground">
                      % of audience
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">18-24</p>
                      <p className="text-xs">35%</p>
                    </div>
                    <Progress value={35} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">25-34</p>
                      <p className="text-xs">42%</p>
                    </div>
                    <Progress value={42} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">35-44</p>
                      <p className="text-xs">15%</p>
                    </div>
                    <Progress value={15} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">45+</p>
                      <p className="text-xs">8%</p>
                    </div>
                    <Progress value={8} className="h-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Top Locations</p>
                    <p className="text-xs text-muted-foreground">
                      % of audience
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">United States</p>
                      <p className="text-xs">38%</p>
                    </div>
                    <Progress value={38} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">United Kingdom</p>
                      <p className="text-xs">24%</p>
                    </div>
                    <Progress value={24} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs">Canada</p>
                      <p className="text-xs">18%</p>
                    </div>
                    <Progress value={18} className="h-1" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" className="px-0 text-sm" asChild>
              <Link href="/analytics">
                View detailed audience data{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>
            Optimize your Instagram business performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border bg-card p-4 shadow-sm space-y-3"
                    >
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))
              : [
                  {
                    icon: <Users className="h-4 w-4 text-primary" />,
                    title: "Engage with Followers",
                    description:
                      "You have 15 unanswered comments. Respond to increase engagement.",
                    link: "/comments",
                    linkText: "View Comments",
                  },
                  {
                    icon: <BarChart3 className="h-4 w-4 text-primary" />,
                    title: "Optimize Posting Schedule",
                    description:
                      "Your audience is most active at 6-8 PM. Schedule posts accordingly.",
                    linkText: "Create Schedule",
                  },
                  {
                    icon: <ShoppingBag className="h-4 w-4 text-primary" />,
                    title: "Set Up Shop Feature",
                    description:
                      "Increase sales by tagging products in your posts and stories.",
                    linkText: "Set Up Shop",
                  },
                ].map((action, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card p-4 shadow-sm"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {action.icon}
                    </div>
                    <h3 className="mt-4 font-medium">{action.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {action.description}
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 h-auto p-0 text-sm"
                      asChild={!!action.link}
                    >
                      {action.link ? (
                        <Link href={action.link}>{action.linkText}</Link>
                      ) : (
                        action.linkText
                      )}
                    </Button>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-medium text-red-600 dark:text-red-400">
                  Error Loading Data
                </h3>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">
                  {error}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/50"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
