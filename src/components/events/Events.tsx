
import { API_BASE_URL } from "@/lib/api";
import { EventRecord } from "@/lib/types";
import EventCard from "./EventCard";
import { CalendarDays, Sparkles } from "lucide-react";

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
  .filter((event) => event.eventDate >= today)
  .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
              <Sparkles size={17} />
              Make a Difference Together
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover meaningful community events and join people
              who are making a positive difference.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <CalendarDays size={18} className="text-green-700" />
            {upcomingEvents.length} Upcoming Events
          </div>
        </div>

        {/* Events Grid */}
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-50 text-green-700">
              <CalendarDays size={26} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No Upcoming Events
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              There are no upcoming events right now.
              Check back later or create an event to inspire your community.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
