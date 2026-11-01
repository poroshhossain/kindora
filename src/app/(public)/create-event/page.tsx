"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus, Loader2, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

const createEventSchema = z.object({
  title: z.string().trim().min(1, "Event title is required.").max(120),
  description: z
    .string()
    .trim()
    .min(1, "Please describe the event so volunteers know what to expect.")
    .max(2000),
  banner: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/.test(value),
      "Banner must be a valid URL starting with http(s)://",
    )
    .optional(),
  date: z
    .string()
    .min(1, "Event date & time is required.")
    .refine(
      (value) => !Number.isNaN(new Date(value).getTime()),
      "Pick a valid date & time.",
    ),
  location: z.string().trim().min(1, "Location is required.").max(160),
});

type CreateEventValues = z.infer<typeof createEventSchema>;

const fieldErrorClasses = "mt-1 text-xs font-medium text-destructive";

export default function CreateEventPage() {
  const router = useRouter();

  // Creating events is an account action — guard to logged-in users.
  const { data: session, isPending } = authClient.useSession();
  const isSignedIn = Boolean(session);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      banner: "",
      date: "",
      location: "",
    },
  });

  useEffect(() => {
    if (!isPending && !isSignedIn) {
      toast.error("Please login first to create an event.");
      router.replace("/login");
    }
  }, [isPending, isSignedIn, router]);

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      toast.error(data?.message ?? "Failed to publish the event. Try again.");
      return;
    }

    toast.success(
      'Event published! You can also click "View all" on the homepage.',
    );
    reset();
    router.push("/upcoming-events");
  });

  if (isPending || !isSignedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <PartyPopper className="size-6" />
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Create an event
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Publish a community service initiative — it appears instantly on the
          homepage for volunteers to join
        </p>
      </div>

      <Card className="shadow-lg sm:shadow-xl">
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="title">Event title</Label>
              <Input
                id="title"
                placeholder="e.g. Citywide tree plantation drive"
                aria-invalid={Boolean(errors.title)}
                {...register("title")}
              />
              {errors.title ? (
                <p className={fieldErrorClasses}>{errors.title.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What will volunteers do? What should they bring?"
                aria-invalid={Boolean(errors.description)}
                {...register("description")}
              />
              {errors.description ? (
                <p className={fieldErrorClasses}>{errors.description.message}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="banner">
                Banner image URL{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="banner"
                type="url"
                placeholder="https://picsum.photos/id/442/800/500"
                aria-invalid={Boolean(errors.banner)}
                {...register("banner")}
              />
              {errors.banner ? (
                <p className={fieldErrorClasses}>{errors.banner.message}</p>
              ) : null}
            </div>

            <div className="grid gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="date">Event date &amp; time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  aria-invalid={Boolean(errors.date)}
                  {...register("date")}
                />
              </div>
              {errors.date ? (
                <p className={fieldErrorClasses}>{errors.date.message}</p>
              ) : null}

              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Ramsagar Park, Main Gate"
                  aria-invalid={Boolean(errors.location)}
                  {...register("location")}
                />
                {errors.location ? (
                  <p className={fieldErrorClasses}>{errors.location.message}</p>
                ) : null}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  <CalendarPlus className="size-4" />
                  Publish event
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Prefer talking to us first?{" "}
        <Link href="/" className="font-medium text-primary hover:underline">
          Back to home
        </Link>
      </p>
    </section>
  );
}
