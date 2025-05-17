"use server";

export async function loginUser(email: string) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const data = await res.json();
  return data;
}

export async function verifyCode(email: string, code: string) {
  const res = await fetch("http://localhost:3000/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    throw new Error("Failed to verify code");
  }

  const data = await res.json();
  return data;
}
