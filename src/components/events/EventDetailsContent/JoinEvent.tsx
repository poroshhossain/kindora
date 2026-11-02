"use client"
import { EventRecord } from "@/lib/types"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

interface JoinEventProps {
    event:EventRecord
}
const JoinEvent = ({event}:JoinEventProps) => {
    console.log(event)
    const [addToJoin , setAddToJoin]= useState();
    const handleAddToJoin = (item)=>{
        setAddToJoin(item)
    }
    console.log('add to join', addToJoin)
    return (
        <button
        onClick={()=> handleAddToJoin(event)}
            className="mt-8 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-4 text-sm font-bold text-secondary-foreground shadow-md shadow-secondary/15 transition hover:-translate-y-0.5 hover:opacity-90"
        >
            Login to Join Event
            <ArrowUpRight size={18} />
        </button>
    )
}
export default JoinEvent