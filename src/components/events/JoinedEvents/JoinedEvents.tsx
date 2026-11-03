
"use client";

import { useEffect, useState } from "react";
import { EventRecord } from "@/types/types";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Ticket,
  Sparkles,
  CalendarCheck,
  Compass,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const JoinedEvents = () => {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/joined-events?userEmail=${encodeURIComponent(
            session.user.email
          )}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load events");
        }

        setEvents(result.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <section className="min-h-[70vh] bg-background px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-10 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-border"
              >
                <div className="h-56 animate-pulse bg-muted" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Ticket size={30} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-foreground">
            Your events are waiting
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Sign in to explore your joined events and keep track of your
            upcoming experiences.
          </p>

          <Link
            href="/sign-in"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Sign In <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

        {/* Header */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 size-52 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary">
                <Sparkles size={14} />
                YOUR EVENT SPACE
              </div>

              <h1 className="max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Experiences worth
                <span className="block text-primary">
                  looking forward to.
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                All your joined events, gathered in one place.
                Your next experience starts here.
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-1 hover:opacity-90"
            >
              Explore Events
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-9 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-background/80 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ticket size={17} />
                <span className="text-xs font-medium">Total Joined</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {events.length}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/80 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarCheck size={17} />
                <span className="text-xs font-medium">My Collection</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-secondary">
                {events.length.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Your collection
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Joined Events
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep an eye on the experiences you've signed up for.
            </p>
          </div>

          {events.length > 0 && (
            <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-muted-foreground">
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!error && events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface px-5 py-16 text-center sm:py-24">
            <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary-light text-primary">
              <Compass size={36} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-foreground">
              Your next adventure awaits!
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              You haven't joined any events yet. Discover something
              interesting and make your first event memorable.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Discover Events
              <ArrowUpRight size={18} />
            </Link>
          </div>
        ) : (
          !error && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="group overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      {event.eventType}
                    </span>

                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground">
                      <CalendarCheck size={13} />
                      Joined
                    </span>

                    <span className="absolute bottom-4 right-4 text-xs font-medium text-white/90">
                      {new Date(event.eventDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="line-clamp-1 text-xl font-bold text-foreground transition group-hover:text-primary">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="my-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/70 p-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <CalendarDays size={15} />
                          <span className="text-[11px] font-medium">
                            Event Date
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-semibold text-foreground">
                          {new Date(event.eventDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/70 p-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin size={15} />
                          <span className="text-[11px] font-medium">
                            Location
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-1 text-xs font-semibold text-foreground">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      View Event Details
                      <ArrowUpRight
                        size={18}
                        className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )
        )}
      </section>
    </main>
  );
};

export default JoinedEvents;
