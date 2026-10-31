import { cn } from "cn";
import { ArrowRight, CalendarDays, CalendarPlus, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRecentEvents } from "@/lib/events";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function RecentEvents() {
  // MongoDB reads deliver request-time data, so opt out of prerendering for
  // this section (keeps the surrounding shell static/streamed via Suspense).
  await connection();
  // Fail soft: if MongoDB is unreachable (e.g. not running) show the empty
  // state instead of breaking the whole homepage.
  const events = await getRecentEvents(6).catch(() => {});

  return (
    <section className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <span className="text-sm font-semibold tracking-wide text-secondary uppercase">
              Community calendar
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Recent upcoming events
            </h2>
            <p className="text-muted-foreground">
              The six most recently added events across the community — sorted
              by date, pulled live from our database.
            </p>
          </div>
          <Link
            href="/upcoming-events"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1",
            )}
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {events?.length === 0 || !events ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-background px-6 py-16 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary-light text-primary">
              <CalendarPlus className="size-6" />
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                No events yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Be the first to bring something good to your neighborhood.
              </p>
            </div>
            <Link
              href="/create-event"
              className={cn(buttonVariants({ size: "sm" }), "mt-2 gap-1")}
            >
              <CalendarPlus className="size-4" />
              Create the first event
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden pb-0 transition-shadow hover:shadow-lg"
              >
                <Link
                  href="/upcoming-events"
                  className="block focus-visible:outline-none"
                >
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
                    <span className="truncate">{event.location}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
