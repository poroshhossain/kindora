"use client"
import { useAuth } from "@/context/authContext"

const JoinEventPage = () => {
    const {addToJoin}= useAuth();
  return (
    <div>JoinEventPage{addToJoin?.title}
    {addToJoin?.description}
    </div>
  )
}
export default JoinEventPage