"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  CalendarClock,
  CalendarPlus,
  Loader2,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { API_BASE_URL } from "@/lib/api";

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
  donation: "Donation",
  "food-distribution": "Food Distribution",
  "blood-donation": "Blood Donation",
  plantation: "Plantation",
  "awareness-campaign": "Awareness Campaign",
  other: "Other",
};

/** Shape expected by Base UI Select's `items` prop (maps values to rendered labels). */
const eventTypeItems = Object.fromEntries(
  EVENT_TYPES.map((value) => [value, EVENT_TYPE_LABELS[value]]),
);

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
    .refine(
      (value) => !Number.isNaN(new Date(value).getTime()),
      "Please enter a valid date.",
    )
    .refine(
      (value) => new Date(value).getTime() > Date.now(),
      "Event date must be in the future.",
    ),
  location: z
    .string()
    .trim()
    .min(1, "Location is required.")
    .max(160, "Maximum 160 characters allowed."),
});

type CreateEventValues = z.infer<typeof createEventSchema>;

/** A required-marked form field with its error message. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

/** Local "YYYY-MM-DDTHH:mm" cutoff for the date picker, set after mount to avoid hydration mismatches. */
function useLocalDatetimeMin() {
  const [min, setMin] = useState<string>();

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMin(now.toISOString().slice(0, 16));
  }, []);

  return min;
}

export default function CreateEventPage() {
  const router = useRouter();
  const minDatetime = useLocalDatetimeMin();

  const {
    register,
    handleSubmit,
    watch,
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

  const descriptionLength = watch("description")?.length ?? 0;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        toast.error(data?.message ?? "Failed to create event. Try again.");
        return;
      }

      toast.success("Event created successfully!");
      router.push("/upcoming-events");
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  });

  return (
    <section className="min-h-screen bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Page heading */}
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

        {/* Form card */}
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b border-border/70 pb-5">
            <CardTitle className="text-lg">Event Information</CardTitle>
            <CardDescription>
              Fill in the details below to publish your community event. Fields
              marked with * are required.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              {/* Event title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Event Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Community Tree Plantation"
                  maxLength={120}
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  {...register("title")}
                />
                <FieldError id="title-error" message={errors.title?.message} />
              </div>

              {/* Event type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Event Type <span className="text-destructive">*</span>
                </Label>
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
                        aria-describedby={
                          errors.type ? "type-error" : undefined
                        }
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
                <FieldError id="type-error" message={errors.type?.message} />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {descriptionLength}/2000
                  </span>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe your event, its purpose, and what volunteers will do..."
                  rows={5}
                  maxLength={2000}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                  {...register("description")}
                />
                <FieldError
                  id="description-error"
                  message={errors.description?.message}
                />
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">
                  Thumbnail Image URL{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  aria-invalid={Boolean(errors.thumbnail)}
                  aria-describedby={
                    errors.thumbnail ? "thumbnail-error" : undefined
                  }
                  {...register("thumbnail")}
                />
                <FieldError
                  id="thumbnail-error"
                  message={errors.thumbnail?.message}
                />
              </div>

              {/* Date & location */}
              <div className="space-y-4">
                <div className="border-t pt-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarClock className="size-4 text-primary" />
                    Date &amp; Location
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    When and where will your event take place?
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      Event Date &amp; Time{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="date"
                        type="datetime-local"
                        min={minDatetime}
                        className="scheme-light pl-9 dark:scheme-dark [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60"
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={
                          errors.date ? "date-error" : undefined
                        }
                        {...register("date")}
                      />
                    </div>
                    <FieldError
                      id="date-error"
                      message={errors.date?.message}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="location"
                        placeholder="Enter event location"
                        maxLength={160}
                        className="pl-9"
                        aria-invalid={Boolean(errors.location)}
                        aria-describedby={
                          errors.location ? "location-error" : undefined
                        }
                        {...register("location")}
                      />
                    </div>
                    <FieldError
                      id="location-error"
                      message={errors.location?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
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

        {/* Footer note */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Together, we can make a difference in our community.
        </p>
      </div>
    </section>
  );
}
