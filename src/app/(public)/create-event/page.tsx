"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CalendarPlus, Loader2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postEventApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

// ----------------------------------
// 1. Event Constants
// ----------------------------------

const EVENT_TYPES = [
  "cleanup",
  "plantation",
  "donation",
  "food-distribution",
  "blood-donation",
  "awareness-campaign",
  "other",
] as const;

type EventType = (typeof EVENT_TYPES)[number];

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  cleanup: "Cleanup",
  plantation: "Plantation",
  donation: "Donation",
  "food-distribution": "Food Distribution",
  "blood-donation": "Blood Donation",
  "awareness-campaign": "Awareness Campaign",
  other: "Other",
};

const eventTypeItems = Object.fromEntries(
  EVENT_TYPES.map((type) => [type, EVENT_TYPE_LABELS[type]]),
) as Record<EventType, string>;

// ----------------------------------
// 2. Date Helper
// ----------------------------------

const getTodayDate = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
  }).format(new Date());
};

const isValidDate = (value: string) => {
  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
};

// ----------------------------------
// 3. Zod Validation
// ----------------------------------

const createEventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Event title is required.")
    .max(120, "Maximum 120 characters allowed."),

  type: z.enum(EVENT_TYPES, {
    message: "Please select an event type.",
  }),

  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(2000, "Maximum 2000 characters allowed."),

  thumbnail: z.string().trim().url("Please enter a valid image URL."),

  date: z
    .string()
    .min(1, "Event date is required.")
    .refine(isValidDate, "Please enter a valid date.")
    .refine(
      (date) => date > getTodayDate(),
      "Event date must be in the future.",
    ),

  location: z
    .string()
    .trim()
    .min(1, "Location is required.")
    .max(160, "Maximum 160 characters allowed."),
});

export type CreateEventValues = z.infer<typeof createEventSchema>;

// ----------------------------------
// 4. Reusable Error Component
// ----------------------------------

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

// ----------------------------------
// 5. Create Event Form
// ----------------------------------

export default function CreateEventForm() {
  const router = useRouter();

  const [today, setToday] = useState("");

  // Get today's date after component mounts
  useEffect(() => {
    setToday(getTodayDate());
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      date: "",
      location: "",
    },
  });

  // Watch only description field
  const description = useWatch({
    control,
    name: "description",
  });

  // ----------------------------------
  // 6. Submit Handler
  // ----------------------------------

  const { data: session } = authClient.useSession();
  const onSubmit = async (values: CreateEventValues) => {
    try {
      const eventData = {
        title: values.title,
        description: values.description,
        eventType: values.type,
        thumbnail: values.thumbnail,
        location: values.location,
        eventDate: values.date,
        createdBy: session?.user?.email,
      };

      await postEventApi(eventData);

      toast.success("Event created successfully!");

      router.push("/upcoming-events");
      router.refresh();
    } catch (error) {
      console.error("Create event error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to create event.",
      );
    }
  };

  // ----------------------------------
  // 7. UI
  // ----------------------------------

  return (
    <section className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Community Events
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Create an Event
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Bring people together and make a positive impact. Share your
            initiative with the community.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b border-border/70 pb-5">
            <CardTitle className="text-lg">Event Information</CardTitle>

            <CardDescription>
              Fill in the details below to publish your community event. All
              fields are required.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>

                <Input
                  id="title"
                  placeholder="e.g. Community Tree Plantation"
                  maxLength={120}
                  aria-invalid={Boolean(errors.title)}
                  {...register("title")}
                />

                <FieldError message={errors.title?.message} />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Event Type *</Label>

                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? null}
                      onValueChange={(value) =>
                        field.onChange(value ?? undefined)
                      }
                      items={eventTypeItems}
                    >
                      <SelectTrigger
                        id="type"
                        className="w-full"
                        aria-invalid={Boolean(errors.type)}
                      >
                        <SelectValue placeholder="Choose an event category" />
                      </SelectTrigger>

                      <SelectContent>
                        {EVENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {EVENT_TYPE_LABELS[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <FieldError message={errors.type?.message} />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="description">Description *</Label>

                  <span className="text-xs tabular-nums text-muted-foreground">
                    {description?.length ?? 0}/2000
                  </span>
                </div>

                <Textarea
                  id="description"
                  placeholder="Describe your event, its purpose, and what volunteers will do..."
                  rows={5}
                  maxLength={2000}
                  aria-invalid={Boolean(errors.description)}
                  {...register("description")}
                />

                <FieldError message={errors.description?.message} />
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image URL *</Label>

                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  aria-invalid={Boolean(errors.thumbnail)}
                  {...register("thumbnail")}
                />

                <FieldError message={errors.thumbnail?.message} />
              </div>

              {/* Date & Location */}
              <div className="space-y-4">
                <div className="border-t pt-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="size-4 text-primary" />
                    Date & Location
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    When and where will your event take place?
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Event Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>

                    <Input
                      id="date"
                      className="w-full"
                      type="date"
                      min={today || undefined}
                      aria-invalid={Boolean(errors.date)}
                      {...register("date")}
                    />

                    <FieldError message={errors.date?.message} />

                    <p className="text-xs text-muted-foreground">
                      Please select a future date.
                    </p>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="location"
                        placeholder="Enter event location"
                        maxLength={160}
                        className="pl-9"
                        aria-invalid={Boolean(errors.location)}
                        {...register("location")}
                      />
                    </div>

                    <FieldError message={errors.location?.message} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-5">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="size-4" />
                      Create Event
                    </>
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Please review your event details before publishing.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Together, we can make a difference in our community.
        </p>
      </div>
    </section>
  );
}
