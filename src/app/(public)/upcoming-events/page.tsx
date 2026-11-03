import Events from "@/components/events/Events";
import EventsSkeleton from "@/components/events/EventsSkeleton";
import { Suspense } from "react";

const UpcomingEventsPage = async () => {

  return (
    <>
      <Suspense fallback={ <EventsSkeleton/> }>
        <Events />
      </Suspense>
    </>
  )
}
export default UpcomingEventsPage