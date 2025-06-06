"use client";
import { getInstagramMediaWithComments } from "@/app/actions/instagramService";
import InstagramGridFeed from "@/components/instagram-grid-feed";

import { useEffect, useState } from "react";
export interface InstagramComment {
  _id: string;
  comment_id: string;
  __v: number;
  avatar_url: string;
  created_at: string; // ISO date string
  media_id: string;
  timestamp: string; // ISO date string
  updated_at: string; // ISO date string
  user_id: string;
  username: string;
  parent_comment_id: string | null;
  text: string;
  user_id_internal: string;
  replies: InstagramComment[]; // recursive replies
}

export interface InstagramMedia {
  _id: string;
  media_id: string;
  __v: number;
  comments_count: number;
  created_at: string;
  like_count: number;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  updated_at: string;
  user_id: string;
  comments: InstagramComment[];
  caption?: string;
}

export default function InstagramFeedPage() {
  const [data, setData] = useState<InstagramMedia[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("No token found");
      setError("No access token found. Please login first.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getInstagramMediaWithComments(token);
        console.log("Fetched data:", result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch Instagram data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );

  // Pass the fetched data to InstagramGridFeed as a prop
  return (
    <InstagramGridFeed
      mediaData={data || []}
      userToken={localStorage.getItem("access_token")!}
    />
  );
}
