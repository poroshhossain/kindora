"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { EventRecord } from "@/types/types";
import DeleteEvent from "./DelateEvent";
import EditEvent from "./EditEvent";

const ManageEvents = () => {
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

    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/my-events?userEmail=${encodeURIComponent(
            session.user.email,
          )}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load events");
        }

        setEvents(result.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [session, isPending]);

  if (isPending || loading) {
    return <p className="py-20 text-center">Loading your events...</p>;
  }

  if (!session?.user?.email) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Please login first</h2>
        <Link href="/login" className="text-primary underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (error) {
    return <p className="py-20 text-center text-destructive">{error}</p>;
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Event Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold">Manage Your Events</h1>

        <p className="mt-2 text-muted-foreground">
          Manage and organize the events you have created.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-border bg-surface p-5">
        <p className="text-sm text-muted-foreground">Total Events</p>
        <h2 className="mt-1 text-3xl font-bold">{events.length}</h2>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <h2 className="text-xl font-semibold">No events found</h2>
          <p className="mt-2 text-muted-foreground">
            You have not created any events yet.
          </p>
          <Link
            href="/create-event"
            className="mt-5 inline-block rounded-lg bg-primary px-5 py-3 text-primary-foreground"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event._id}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative h-52">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-5">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                  {event.eventType}
                </span>

                <h2 className="mt-4 text-xl font-bold">{event.title}</h2>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={17} />
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={17} />
                    {event.location}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <EditEvent event={event} />

                  <DeleteEvent event={event} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageEvents;
