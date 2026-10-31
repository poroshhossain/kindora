import { cn } from "cn";
import { ArrowRight, CalendarPlus, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const stats = [
  { value: "120+", label: "Volunteers joined" },
  { value: "45", label: "Events hosted" },
  { value: "8k+", label: "Lives impacted" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/10 via-primary-light/60 to-background">
      {/* Decorative blurred blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -right-32 size-[28rem] rounded-full bg-secondary/15 blur-3xl"
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/80 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur">
          <HeartHandshake className="size-4" />
          Social development &amp; community service
        </span>

        <div className="max-w-3xl space-y-5">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Small acts of kindness,{" "}
            <span className="text-primary underline decoration-primary/30 decoration-4 underline-offset-8">
              extraordinary change
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Kindora connects volunteers with meaningful community events — food
            drives, tree plantations, blood donation, education camps and more.
            Discover a cause near you and make your time count.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/upcoming-events"
            className={cn(buttonVariants({ size: "lg" }), "px-6")}
          >
            Explore events
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/create-event"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "bg-background/80 px-6 backdrop-blur",
            )}
          >
            <CalendarPlus className="size-4" />
            Create an event
          </Link>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-6 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </dd>
              <dd className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
