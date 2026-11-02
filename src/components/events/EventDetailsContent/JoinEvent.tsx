"use client"
import { useAuth } from "@/context/authContext"
import { EventRecord } from "@/lib/types"
import { ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface JoinEventProps {
    event: EventRecord
}
const JoinEvent = ({ event }: JoinEventProps) => {
    const router = useRouter()
    const { addToJoin, setAddToJoin } = useAuth();
    const isJoined = addToJoin?._id === event._id;
    const handleAddToJoin = (item:EventRecord) => {
        if (isJoined) return;
        setAddToJoin(item)
        toast.success("Event joined successfully!");
        router.replace('/join-events')

    }

    return (
        <button
            disabled={isJoined}
            onClick={() => handleAddToJoin(event)}
            className="mt-8 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-4 text-sm font-bold text-secondary-foreground shadow-md shadow-secondary/15 transition hover:-translate-y-0.5 hover:opacity-90"
        >
            {isJoined ? "Already Selected" : "Login to Join Event"}
            <ArrowUpRight size={18} />
        </button>
    )
}
export default JoinEvent