"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dinkaconfig from "@/dinka-config";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { signOut } from "@/auth";

export function LoginForm({ className, ...props }: any) {
  const [stage, setStage] = useState(props.stage || 0);
  const [otp, setOtp] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <div className="text-center ">
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  const handleChange = (e: any) => {
    setCredentials((cred) => ({
      ...cred,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSign = async (e: any) => {
    e.preventDefault();

    if (stage === 0) {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credentials, stage }),
      });

      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.success && data.stage !== undefined) {
        setStage(data.stage);
      }
    }
    if (stage === 1) {
      const res = await signIn("email-otp", {
        email: credentials.email,
        otp: otp,
        password: credentials.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (res?.error) {
        toast.error("OTP Login failed.");
      } else {
        toast.success("Logged in!");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>
            {stage === 0 && "Create with your existing Apple or Google account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSign}>
            <Toaster />
            <div className="grid gap-6">
              {stage === 0 && (
                <>
                  <div className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full">
                      {/* Apple Logo */}
                      Login with Apple
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        signIn("google", { callbackUrl: "/" });
                      }}
                    >
                      {/* Google Logo */}
                      Login with Google
                    </Button>
                  </div>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                </>
              )}

              {stage === 0 && (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      name="email"
                      onChange={handleChange}
                      value={credentials.email}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href={dinkaconfig.links["forgot-your-password"]}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      name="password"
                      onChange={handleChange}
                      value={credentials.password}
                    />
                  </div>
                </div>
              )}

              {stage === 1 && (
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}

              <Button type="submit" className="w-full">
                {stage === 1 ? "Verify OTP" : "Sign Up"}
              </Button>

              <div className="flex justify-center gap-x-2">
                {[0, 1, 2].map((e) => (
                  <span
                    key={e}
                    className={`h-2 w-2 rounded-full ${
                      e > stage ? "bg-zinc-300" : "bg-zinc-900"
                    }`}
                  />
                ))}
              </div>

              <div className="text-center text-sm">
                Have an Account?{" "}
                <Link
                  href={dinkaconfig.links.login}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href={dinkaconfig.links["terms-of-service"]}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href={dinkaconfig.links["privacy-policy"]}>Privacy Policy</Link>.
      </div>
    </div>
  );
}
