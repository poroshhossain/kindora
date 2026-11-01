import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { EventRecord } from "@/lib/events";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function EventCard({ event }: { event: EventRecord }) {
  return (
    <Card className="group overflow-hidden pb-0 transition-shadow hover:shadow-lg">
      <Link href="/upcoming-events" className="block focus-visible:outline-none">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-primary-light text-primary">
              <CalendarDays className="size-10" />
            </div>
          )}
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-2 px-4 py-4">
        <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
          <CalendarDays className="size-3.5" />
          <time dateTime={event.date}>
            {dateFormat.format(new Date(event.date))}
          </time>
        </p>
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>
        <p className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-secondary" />
          <span className="truncate">
            {event.postedByName ? `${event.postedByName} · ` : ""}
            {event.location}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
