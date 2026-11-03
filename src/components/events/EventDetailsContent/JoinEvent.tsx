"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { postJoinEvent } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { EventRecord } from "@/types/types";

interface JoinEventProps {
  event: EventRecord;
}

const JoinEvent = ({ event }: JoinEventProps) => {
  const router = useRouter();

  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = authClient.useSession();

  const handleAddToJoin = async () => {
    // Authentication check
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }

    if (isJoined || isLoading) return;

    try {
      setIsLoading(true);

      const result = await postJoinEvent(event._id, session.user.email);

      if (!result.success) {
        throw new Error(result.message);
      }

      setIsJoined(true);

      toast.success("Event joined successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to join event",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isJoined || isLoading}
      onClick={handleAddToJoin}
      className="mt-8 flex w-full items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Joining...
        </>
      ) : isJoined ? (
        "Already Joined"
      ) : (
        <>
          Join Event
          <ArrowUpRight size={18} />
        </>
      )}
    </Button>
  );
};

export default JoinEvent;
