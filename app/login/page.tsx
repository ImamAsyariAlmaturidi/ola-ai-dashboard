"use client";

import type React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Facebook, ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { loginUser, verifyCode } from "../actions/auth";

const LoginPageLottie = dynamic(() => import("@/components/loginPageLottie"), {
  ssr: false,
});
// Dummy OTP for verification
const DUMMY_OTP = "123456";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    const res = await loginUser(email);
    if (!res) {
      toast.error("Send otp failed");
      setIsLoading(false);
      setIsOtpSent(false);
      return;
    }
    toast.success("OTP sent successfully");
    setIsLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      console.log(`OTP sent to ${email}: ${DUMMY_OTP}`);
      toast.success(`Verification code sent to ${email}`);
      setIsOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the verification code");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(async () => {
      const res = await verifyCode(email, otp);
      if (!res) {
        toast.error("Invalid verification code");
        setIsLoading(false);
        setVerificationStatus("error");
        return;
      }
      localStorage.setItem("access_token", res.token);
      setVerificationStatus("success");
      setTimeout(() => {
        login({
          username: email.split("@")[0],
          email,
          avatar: "/placeholder.svg?height=40&width=40",
        });
        router.push("/dashboard");
      }, 1000);
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToEmail = () => {
    setIsOtpSent(false);
    setOtp("");
    setVerificationStatus("idle");
  };

  const handleFacebookLogin = () => {
    login({
      username: "instagram_user",
      email: "user@instagram.com",
      avatar: "/placeholder.svg?height=40&width=40",
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div>
        <LoginPageLottie />
      </div>
      <div>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login to Instagram Manager
            </CardTitle>
            <CardDescription className="text-center">
              {isOtpSent
                ? "Enter the verification code sent to your email"
                : "Enter your email to receive a verification code"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isOtpSent ? (
              // Email Form
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Login"}
                </Button>
              </form>
            ) : (
              // OTP Verification Form
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-muted-foreground"
                      type="button"
                      onClick={handleBackToEmail}
                      disabled={isLoading}
                    >
                      <ArrowLeft className="mr-1 h-3 w-3" />
                      Change email
                    </Button>
                  </div>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setVerificationStatus("idle");
                    }}
                    maxLength={6}
                    required
                    disabled={isLoading || verificationStatus === "success"}
                    className={
                      verificationStatus === "success"
                        ? "border-green-500 focus-visible:ring-green-500"
                        : verificationStatus === "error"
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {verificationStatus === "success" && (
                    <p className="text-sm font-medium text-green-500">
                      ✅ Login Success
                    </p>
                  )}
                  {verificationStatus === "error" && (
                    <p className="text-sm font-medium text-red-500">
                      ❌ Invalid Code
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || verificationStatus === "success"}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </form>
            )}

            <div className="my-4 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleFacebookLogin}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Continue with Facebook
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
