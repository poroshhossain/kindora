"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import BtnWithGoogle from "@/components/auth/BtnWithGoogle";
import { registerSchema } from "@/components/auth/zod";
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
import { authClient } from "@/lib/auth-client";

type RegisterValues = z.infer<typeof registerSchema>;

const fieldErrorClasses = "mt-1 text-xs font-medium text-destructive";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", photoUrl: "", password: "" },
  });

  const router = useRouter();
  const onRegister = handleSubmit(async (values) => {
    try {
      const { photoUrl, ...userData } = values;

      const { data, error } = await authClient.signUp.email({
        ...userData,
        image: photoUrl || undefined,
      });
      if (data) {
        toast.success("Account created successfully!");
        router.replace("/");
      }
      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  });

  return (
    <div className="w-full max-w-md">
      <Card className="shadow-lg sm:shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Join Kindora to discover and host events
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onRegister} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
              {errors.name ? (
                <p className={fieldErrorClasses}>{errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
              {errors.email ? (
                <p className={fieldErrorClasses}>{errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="photoUrl">
                Photo URL{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="photoUrl"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                autoComplete="photo"
                aria-invalid={Boolean(errors.photoUrl)}
                {...register("photoUrl")}
              />
              {errors.photoUrl ? (
                <p className={fieldErrorClasses}>{errors.photoUrl.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="min 6 chars, Aa"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />
              {errors.password ? (
                <p className={fieldErrorClasses}>{errors.password.message}</p>
              ) : null}
              <p className="text-xs text-muted-foreground">
                Min 6 characters with at least one uppercase and one lowercase
                letter.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs font-medium text-muted-foreground">
              OR
            </span>
            <Separator className="flex-1" />
          </div>

          <BtnWithGoogle />
        </CardContent>

        <CardFooter className="justify-center border-t text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login here
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
