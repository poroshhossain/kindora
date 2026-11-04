"use client";

import { getLeaveEvent } from "@/lib/api";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LeaveEventBtnProps {
    eventId: string;
}

const LeaveEventBtn = ({ eventId }: LeaveEventBtnProps) => {
    const [loading, setLoading] = useState(false);

    const handleLeave = async () => {
        try {
            setLoading(true);

            await getLeaveEvent(eventId)

            toast.success('succesfully leave Event');
            window.location.reload()
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLeave}
            disabled={loading}
            className="rounded-xl flex items-center gap-2 border border-destructive/30 px-4 py-3 text-sm font-bold text-destructive transition hover:bg-destructive hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? (
                <Loader2 className="size-4 animate-spin" />
            ) : (
                <LogOut className="size-4" />
            )}

            {loading ? "Leaving..." : "Leave Event"}
        </button>
    );
};

export default LeaveEventBtn;