
import EventDetailsContent from "@/components/events/EventDetailsContent/EventDetailsContent";
import EventDetailsSkeleton from "@/components/events/EventDetailsContent/EventDetailsSkeleton";
import { Suspense } from "react";


interface Props {
  params: Promise<{ id: string }>;
}

const EventDetailsPage = ({ params }: Props) => {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
};

export default EventDetailsPage;
