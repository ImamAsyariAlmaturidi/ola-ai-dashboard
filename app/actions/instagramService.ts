"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function getInstagramProfile(token: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/instagram/profile-dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Faed to fetch profile");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[getProfileFromBackend] Error:", error);
    throw error;
  }
}

export async function getInstagramMediaWithComments(token: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/instagram/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch media comments");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("[getInstagramMediaComments] Error:", error);
    throw error;
  }
}

export async function postInstagramCommentReply({
  token,
  commentId,
  message,
}: {
  token: string;
  commentId: string;
  message: string;
}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/instagram/comment-reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        commentId,
        message,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to reply to comment: ${error}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[postInstagramCommentReply] Error:", error);
    throw error;
  }
}
