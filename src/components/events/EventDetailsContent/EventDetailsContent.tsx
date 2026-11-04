import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import type { EventRecord } from "@/types/types";
import JoinEvent from "./JoinEvent";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const formatEventDate = (date: string) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(parsedDate);
};

const EventDetailsContent = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;

  let event: EventRecord;

  const jwtToken = await auth.api.getToken({
    headers: await headers()
  })
  console.log(jwtToken?.token)
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      headers:{
        Authorization:`Bearer ${jwtToken?.token}`
      },
      cache: "no-store",
    });

    if (response.status === 404 || response.status === 400) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    event = await response.json();

    if (!event || !event._id) {
      notFound();
    }
  } catch (error) {
    console.error("Event details error:", error);
    throw error;
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Top Navigation */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/upcoming-events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft
              size={18}
              className="transition group-hover:-translate-x-1"
            />
            Back to Events
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary">
              <Sparkles size={17} />
            </span>
            Kindora
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <section className="relative mt-6 overflow-hidden rounded-3xl bg-muted shadow-sm sm:mt-10">
          <div className="relative aspect-16/11 sm:aspect-21/9">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-slate-950/5" />

            {/* Category Badge */}
            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-2 text-xs font-bold text-green-800 shadow-lg backdrop-blur-md sm:text-sm">
                <Tag size={15} />
                {event.eventType}
              </span>
            </div>

            {/* Hero Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12">
              <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-white/90 sm:text-sm">
                <span className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-blue-300" />
                  {formatEventDate(event.eventDate)}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin size={17} className="text-green-300" />
                  {event.location}
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Be part of something meaningful. Join your community and help
                create a positive impact together.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Event Overview */}
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Sparkles size={21} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Event Overview
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-foreground">
                    About This Event
                  </h2>
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-8 text-muted-foreground sm:text-base">
                {event.description}
              </p>
            </section>

            {/* Event Highlights */}
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Make An Impact
                </span>

                <h2 className="mt-2 text-xl font-bold text-foreground">
                  Why Participate?
                </h2>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Every small contribution can make a meaningful difference in
                  our community.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  "Make a positive impact through community action.",
                  "Connect with like-minded people and volunteers.",
                  "Help build a stronger and more supportive community.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-secondary"
                    />

                    <p className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {/* Join Card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              {/* Card Header */}
              <div className="relative overflow-hidden bg-primary p-6 text-primary-foreground">
                <div className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/15">
                    <Users size={24} />
                  </div>

                  <h2 className="text-xl font-bold">Be Part of the Change</h2>

                  <p className="mt-2 text-sm leading-6 text-primary-foreground/80">
                    Your participation matters. Join this event and make a
                    difference together.
                  </p>
                </div>
              </div>

              <div className="p-6">
                {/* Event Information */}
                <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Event Information
                </h3>

                <div className="space-y-5">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <CalendarDays size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Event Date
                      </p>

                      <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
                        {formatEventDate(event.eventDate)}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                      <MapPin size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Location
                      </p>

                      <p className="mt-1 wrap-break-word text-sm font-semibold leading-6 text-foreground">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <Tag size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {event.eventType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <JoinEvent event={event} />

                <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                  Sign in to participate in this community event.
                </p>
              </div>
            </div>

            {/* Community Note */}
            <div className="rounded-2xl border border-secondary/20 bg-secondary-light p-5">
              <div className="flex items-center gap-2 text-secondary">
                <Sparkles size={18} />

                <h3 className="text-sm font-bold">Together We Can</h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-secondary/80">
                Small actions, when combined, can create extraordinary changes
                in our communities.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsContent;
