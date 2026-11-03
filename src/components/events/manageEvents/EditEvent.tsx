"use client";

import { CalendarDays, Image, Loader2, MapPin, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { type UpdateEventData, updateEventApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { EventRecord } from "@/types/types";

interface EditEventProp {
  event: EventRecord;
  onUpdated?: (updatedEvent: EventRecord) => void;
}

const EVENT_TYPES = [
  "cleanup",
  "plantation",
  "donation",
  "food-distribution",
  "blood-donation",
  "awareness-campaign",
  "other",
];

const EVENT_TYPE_LABELS: Record<string, string> = {
  cleanup: "Cleanup",
  plantation: "Plantation",
  donation: "Donation",
  "food-distribution": "Food Distribution",
  "blood-donation": "Blood Donation",
  "awareness-campaign": "Awareness Campaign",
  other: "Other",
};

const EditEvent = ({ event, onUpdated }: EditEventProp) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState<UpdateEventData>({
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnail: event.thumbnail,
    location: event.location,
    eventDate: event.eventDate,
  });

  // Update form values when event changes
  useEffect(() => {
    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate,
    });
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending || !session?.user?.email) {
      toast.error("Please login first.");
      return;
    }

    // Basic validation
    const hasEmptyField = Object.values(formData).some(
      (value) => !value.trim(),
    );

    if (hasEmptyField) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsUpdating(true);

      await updateEventApi(event._id, session.user.email, formData);

      const updatedEvent = {
        ...event,
        ...formData,
      };

      onUpdated?.(updatedEvent);

      toast.success("Event updated successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update event error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to update event.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="flex-1 gap-2">
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

          <DialogTitle className="text-xl font-bold">Edit Event</DialogTitle>

          <DialogDescription>
            Update your event information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5 px-6 py-5">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              maxLength={120}
              required
            />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label>Event Type</Label>

            <Select
              value={formData.eventType}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  eventType: value ?? "",
                }))
              }
              items={EVENT_TYPE_LABELS}
            >
              <SelectTrigger className="w-full">
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
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              rows={4}
              maxLength={2000}
              required
            />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">
              <Image className="mr-1 inline size-4" />
              Thumbnail URL
            </Label>

            <Input
              id="thumbnail"
              name="thumbnail"
              type="url"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Date and Location */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventDate">
                <CalendarDays className="mr-1 inline size-4" />
                Event Date
              </Label>

              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                <MapPin className="mr-1 inline size-4" />
                Location
              </Label>

              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location"
                maxLength={160}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="border-t border-border pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isUpdating || isPending}
              className="gap-2"
            >
              {isUpdating ? (
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
