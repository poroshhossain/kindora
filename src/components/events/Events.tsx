
import { EventRecord } from "@/types/types";
import EventsExplorer from "./EventsExplorer";
import { getEventsApi } from "@/lib/api";

const Events = async () => {


  const eventsData: EventRecord[] = await getEventsApi();


  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  const upcomingEvents = eventsData
    .filter((event) => {
      if (!event.eventDate) return false;

      const eventDate = new Date(event.eventDate);

      if (Number.isNaN(eventDate.getTime())) return false;

      const formattedDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dhaka",
      }).format(eventDate);

      return formattedDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    );


  return <EventsExplorer events={upcomingEvents} />;
};

export default Events;
