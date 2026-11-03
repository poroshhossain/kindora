
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-24 lg:py-28">

      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">

          {/* Left Content */}
          <div className="space-y-7 text-center lg:col-span-7 lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary-light px-4 py-2 text-xs font-semibold tracking-wide text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Community-Driven Social Platform
              <Sparkles size={14} />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Gather Action.
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
                Empower Neighborhoods.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
              Create, discover, and join impactful social service campaigns
              in your local area. From winter clothing distribution to
              neighborhood tree plantations — make real change together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row lg:justify-start">

              <Link
                href="/events"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              >
                Explore Upcoming Events
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-7 py-3.5 font-semibold text-foreground transition-all duration-200 hover:border-secondary hover:bg-secondary-light"
              >
                <CalendarDays size={18} className="text-secondary" />
                Host an Event
              </Link>

            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-5 text-sm text-muted-foreground lg:justify-start">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Make a Difference
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Build Community
              </span>
            </div>
          </div>

          {/* Right Featured Event */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg">

              {/* Decorative Shape */}
              <div className="absolute -right-4 -top-4 h-28 w-28 rounded-2xl bg-secondary/10" />
              <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-2xl bg-primary/10" />

              {/* Event Card */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-primary/10">

                {/* Image */}
                <div className="relative h-64 overflow-hidden rounded-xl sm:h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000"
                    alt="Winter Clothes Distribution Drive"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Featured Badge */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Sparkles size={13} className="text-green-400" />
                    Featured Event
                  </div>
                </div>

                {/* Event Info */}
                <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0 space-y-2">
                    <h3 className="truncate text-base font-bold text-foreground sm:text-lg">
                      Winter Clothes Distribution
                    </h3>

                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin size={15} className="shrink-0 text-secondary" />
                      Mirpur 10, Dhaka
                    </p>
                  </div>

                  <Link
                    href="/events"
                    className="shrink-0 rounded-lg bg-secondary-light px-3 py-2 text-xs font-semibold text-secondary transition-colors hover:opacity-80"
                  >
                    Join Event
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
