
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Image, Loader2, MapPin, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { updateEventApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { EventRecord } from "@/types/types";

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
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
};

// ----------------------------------
// 3. Zod Validation
// ----------------------------------

const getEditEventSchema = (originalDate: string) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, "Event title is required.")
      .max(120, "Maximum 120 characters allowed."),

    eventType: z.enum(EVENT_TYPES, {
      message: "Please select an event type.",
    }),

    description: z
      .string()
      .trim()
      .min(1, "Description is required.")
      .max(2000, "Maximum 2000 characters allowed."),

    thumbnail: z.string().trim().url("Please enter a valid image URL."),

    eventDate: z
      .string()
      .min(1, "Event date is required.")
      .refine(isValidDate, "Please enter a valid date.")
      .refine(
        (date) => date >= getTodayDate() || date === originalDate,
        "Event date must be today or in the future.",
      ),

    location: z
      .string()
      .trim()
      .min(1, "Location is required.")
      .max(160, "Maximum 160 characters allowed."),
  });

type EditEventValues = z.infer<ReturnType<typeof getEditEventSchema>>;

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
// 5. Edit Event Component
// ----------------------------------

interface EditEventProp {
  event: EventRecord;
}

const EditEvent = ({ event }: EditEventProp) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [open, setOpen] = useState(false);

  const schema = useMemo(
    () => getEditEventSchema(event.eventDate),
    [event.eventDate],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditEventValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      title: event.title,
      eventType: event.eventType,
      description: event.description,
      thumbnail: event.thumbnail,
      eventDate: event.eventDate,
      location: event.location,
    },
  });

  // Reset form whenever the dialog opens
  useEffect(() => {
    if (open) {
      reset({
        title: event.title,
        eventType: event.eventType,
        description: event.description,
        thumbnail: event.thumbnail,
        eventDate: event.eventDate,
        location: event.location,
      });
    }
  }, [open, event, reset]);

  // ----------------------------------
  // 6. Submit Handler
  // ----------------------------------

  const onSubmit = async (values: EditEventValues) => {
    const userEmail = session?.user?.email;

    if (!userEmail) {
      toast.error("Please login first.");
      return;
    }

    try {
      await updateEventApi(event._id, userEmail, values);

      toast.success("Event updated successfully!");

      setOpen(false);
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Update event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update event.",
      );
    }
  };

  // ----------------------------------
  // 7. UI
  // ----------------------------------

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isSubmitting) setOpen(value);
      }}
    >
      <DialogTrigger
        render={
          <Button variant="outline" className="flex-1 gap-2 cursor-pointer">
            <Pencil className="size-4" />
            Edit Event
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-xl">
        <DialogHeader className="border-b border-border px-6 py-5">
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Pencil className="size-5" />
          </div>

          <DialogTitle className="text-xl font-bold">
            Edit Event
          </DialogTitle>

          <DialogDescription>
            Update your event information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 px-6 py-5"
          noValidate
        >
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>

            <Input
              id="title"
              placeholder="Enter event title"
              maxLength={120}
              aria-invalid={Boolean(errors.title)}
              {...register("title")}
            />

            <FieldError message={errors.title?.message} />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type *</Label>

            <Controller
              control={control}
              name="eventType"
              render={({ field }) => (
                <Select
                  value={field.value ?? null}
                  onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}
                >
                  <SelectTrigger
                    id="eventType"
                    className="w-full"
                    aria-invalid={Boolean(errors.eventType)}
                  >
                    <SelectValue placeholder="Select event type" />
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

            <FieldError message={errors.eventType?.message} />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>

            <Textarea
              id="description"
              placeholder="Describe your event..."
              rows={4}
              maxLength={2000}
              aria-invalid={Boolean(errors.description)}
              {...register("description")}
            />

            <FieldError message={errors.description?.message} />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">
              <Image className="mr-1 inline size-4" />
              Thumbnail URL *
            </Label>

            <Input
              id="thumbnail"
              type="url"
              placeholder="https://example.com/image.jpg"
              aria-invalid={Boolean(errors.thumbnail)}
              {...register("thumbnail")}
            />

            <FieldError message={errors.thumbnail?.message} />
          </div>

          {/* Date & Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventDate">
                <CalendarDays className="mr-1 inline size-4" />
                Event Date *
              </Label>

              <Input
                id="eventDate"
                type="date"
                min={getTodayDate()}
                aria-invalid={Boolean(errors.eventDate)}
                {...register("eventDate")}
              />

              <FieldError message={errors.eventDate?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                <MapPin className="mr-1 inline size-4" />
                Location *
              </Label>

              <Input
                id="location"
                placeholder="Event location"
                maxLength={160}
                aria-invalid={Boolean(errors.location)}
                {...register("location")}
              />

              <FieldError message={errors.location?.message} />
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="border-t border-border pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Pencil className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;
