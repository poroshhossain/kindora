
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { SocialEvent } from "@/types";

interface Props {
  events: SocialEvent[];
}

export const RecentEventsGrid: React.FC<Props> = ({ events }) => {
  return (
    <section className="border-b border-border bg-muted/40 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Upcoming Initiatives
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Recent Social Service Drives
            </h2>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Discover meaningful community events and find opportunities to
              make a positive difference.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            View All Events
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {events.slice(0, 6).map((event) => (
              <article
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-muted">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-3 top-3 rounded-full border border-secondary/20 bg-secondary-light px-3 py-1.5 text-xs font-bold text-secondary">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex-1 space-y-3">
                    <h3 className="line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={15} className="shrink-0 text-secondary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-primary">
                      <CalendarDays size={15} />
                      <time dateTime={event.eventDate}>
                        {new Date(event.eventDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </div>

                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {event.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mt-6 border-t border-border pt-4">
                    <Link
                      href={`/events/${event._id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      View Event
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <CalendarDays
              size={36}
              className="mx-auto mb-4 text-muted-foreground"
            />
            <h3 className="text-lg font-bold text-foreground">
              No Upcoming Events Yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New community initiatives will appear here soon.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explore Events
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
