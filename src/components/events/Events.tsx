
import { API_BASE_URL } from "@/lib/api";
import { EventRecord } from "@/lib/types";
import EventsExplorer from "./EventsExplorer";

const Events = async () => {
  let eventsData: EventRecord[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    eventsData = await res.json();
  } catch (error) {
    console.error("Events fetching error:", error);
  }

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
