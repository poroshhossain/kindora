import { Suspense } from "react";
import Events from "@/components/events/Events";
import EventsSkeleton from "@/components/events/EventsSkeleton";

const UpcomingEventsPage = async () => {
  return (
    <Suspense fallback={<EventsSkeleton />}>
      <Events />
    </Suspense>
  );
};
export default UpcomingEventsPage;
