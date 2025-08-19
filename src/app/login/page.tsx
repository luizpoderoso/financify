"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { logIn } from "@/lib/actions/auth";

const initialState = {
  error: null,
  success: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}

export default function Login() {
  const [state, formAction] = useActionState(logIn, initialState);

  return (
    <form action={formAction} className="px-3 flex justify-center pt-25 py-20">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/*<a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>*/}
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="**********"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <SubmitButton />
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
            <div className="h-4 text-sm font-medium">
              {state?.error && <p className="text-red-500">{state.error}</p>}
              {state?.success && (
                <p className="text-green-500">{state.success}</p>
              )}
            </div>
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
}
