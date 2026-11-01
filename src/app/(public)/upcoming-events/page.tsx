import Events from "@/components/events/Events";
import { Suspense } from "react";

const UpcomingEventsPage = async () => {

  return (
    <>
      <Suspense fallback={ <p>Lodding...</p> }>
        <Events />
      </Suspense>
    </>
  )
}
export default UpcomingEventsPage