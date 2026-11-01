
import { API_BASE_URL } from "@/lib/api";
import { EventRecord } from "@/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Tag,
} from "lucide-react";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const formatEventDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const EventDetailsPage = async ({
  params,
}: EventDetailsPageProps) => {
  const { id } = await params;

  let event: EventRecord;

  try {
    const response = await fetch(
      `${API_BASE_URL}/events/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404 || response.status === 400) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    event = await response.json();
  } catch (error) {
    console.error("Event details error:", error);
    throw error;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">

        {/* Back link */}
        <Link
          href="/upcoming-events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 960px"
            className="object-cover"
          />
        </div>

        {/* Event information */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">

          {/* Main content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              <Tag size={14} />
              {event.eventType}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {event.title}
            </h1>

            <p className="mt-6 leading-8 text-slate-600">
              {event.description}
            </p>
          </div>

          {/* Event summary */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Event Information
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-1 text-green-700" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Event Date</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {formatEventDate(event.eventDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-green-700" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {event.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Join button - authentication integration next */}
            <Link
              href="/sign-in"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Login to Join Event
            </Link>

            <p className="mt-3 text-center text-xs text-slate-500">
              Sign in to participate in this event.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default EventDetailsPage;
