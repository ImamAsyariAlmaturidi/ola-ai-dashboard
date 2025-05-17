"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data
const weeklyData = [
  { name: "Mon", comments: 12, messages: 5, engagement: 3.2 },
  { name: "Tue", comments: 19, messages: 8, engagement: 4.1 },
  { name: "Wed", comments: 15, messages: 12, engagement: 3.8 },
  { name: "Thu", comments: 22, messages: 9, engagement: 4.5 },
  { name: "Fri", comments: 28, messages: 15, engagement: 5.2 },
  { name: "Sat", comments: 35, messages: 18, engagement: 6.1 },
  { name: "Sun", comments: 30, messages: 14, engagement: 5.8 },
];

const monthlyData = [
  { name: "Week 1", comments: 85, messages: 42, engagement: 4.2 },
  { name: "Week 2", comments: 92, messages: 50, engagement: 4.5 },
  { name: "Week 3", comments: 120, messages: 65, engagement: 5.1 },
  { name: "Week 4", comments: 145, messages: 78, engagement: 5.8 },
];

const audienceData = [
  { name: "18-24", male: 15, female: 25, other: 5 },
  { name: "25-34", male: 25, female: 35, other: 8 },
  { name: "35-44", male: 20, female: 15, other: 5 },
  { name: "45-54", male: 10, female: 12, other: 3 },
  { name: "55+", male: 5, female: 8, other: 2 },
];

export default function AnalyticsPage() {
  // const { user } = useAuth()

  // if (!user?.connected) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Connect Your Account</CardTitle>
  //         <CardDescription>You need to connect your Instagram account to view analytics</CardDescription>
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
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>
            Track your Instagram performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="comments" name="Comments" fill="#8884d8" />
                    <Bar dataKey="messages" name="Messages" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="comments" name="Comments" fill="#8884d8" />
                    <Bar dataKey="messages" name="Messages" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Rate</CardTitle>
          <CardDescription>
            Average engagement rate over time (%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  name="Engagement Rate (%)"
                  stroke="#ff7300"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience Demographics</CardTitle>
          <CardDescription>
            Breakdown of your audience by age and gender
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={audienceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" name="Male" fill="#0088FE" />
                <Bar dataKey="female" name="Female" fill="#FF8042" />
                <Bar dataKey="other" name="Other" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>
              Your posts with the highest engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-muted"></div>
                <div className="flex-1">
                  <p className="font-medium">Summer Collection Highlight</p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Likes: 1,245</span>
                    <span>•</span>
                    <span>Comments: 89</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-muted"></div>
                <div className="flex-1">
                  <p className="font-medium">Behind the Scenes</p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Likes: 982</span>
                    <span>•</span>
                    <span>Comments: 67</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-muted"></div>
                <div className="flex-1">
                  <p className="font-medium">Product Launch</p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Likes: 876</span>
                    <span>•</span>
                    <span>Comments: 54</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Insights</CardTitle>
            <CardDescription>
              Key metrics about your account growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">New Followers</p>
                  <p className="text-2xl font-bold">+124</p>
                </div>
                <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                  +12.4%
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Profile Visits</p>
                  <p className="text-2xl font-bold">1,892</p>
                </div>
                <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                  +8.7%
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Impressions</p>
                  <p className="text-2xl font-bold">15,724</p>
                </div>
                <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                  +23.1%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
