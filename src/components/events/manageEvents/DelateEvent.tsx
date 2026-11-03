"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteEventApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { EventRecord } from "@/types/types";

interface DeleteEventProps {
  event: EventRecord;
  onDeleted?: (id: string) => void;
}

const DeleteEvent = ({ event, onDeleted }: DeleteEventProps) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isPending || !session?.user?.email) {
      toast.error("Please login first.");
      return;
    }

    try {
      setIsDeleting(true);

      await deleteEventApi(event._id, session.user.email);

      toast.success("Event deleted successfully!");

      onDeleted?.(event._id);

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Delete event error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete event.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="flex-1 gap-2 rounded-lg border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        }
      />

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <Trash2 className="size-6" />
          </div>

          <AlertDialogTitle>Delete this event?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{event.title}</span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting || isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 size-4" />
                Delete Event
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;
