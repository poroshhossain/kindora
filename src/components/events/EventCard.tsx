
import { EventRecord } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

interface EventCardProps {
  event: EventRecord;
}

const EventCard = ({ event }: EventCardProps) => {

  const formattedDate = new Date(
    `${event.eventDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5">

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">

        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Event Type */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/50 bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-800 shadow-sm backdrop-blur-sm">
            {event.eventType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">

        {/* Event Title */}
        <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-green-700">
          {event.title}
        </h3>

        {/* Event Information */}
        <div className="mt-4 space-y-3">

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={17} className="shrink-0 text-green-700" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={17} className="shrink-0 text-green-700" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

        </div>

        {/* View Event Button */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <Link
            href={`/events/${event._id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            View Event
            <ArrowUpRight size={17} />
          </Link>
        </div>

      </div>
    </article>
  );
};

export default EventCard;
