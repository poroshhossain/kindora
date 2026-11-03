
import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Discover Events Near You",
    description:
      "Find meaningful social initiatives happening in your community. Explore cleanup drives, tree plantations, donation campaigns, and more.",
    icon: MapPin,
    tag: "Explore Opportunities",
    href: "/events",
    size: "lg:col-span-7",
    iconBg: "bg-primary-light text-primary",
  },
  {
    id: 2,
    title: "Create Your Own Event",
    description:
      "Turn your ideas into action. Organize community initiatives, share your vision, and bring people together for a meaningful cause.",
    icon: CalendarDays,
    tag: "Start Organizing",
    href: "/create-event",
    size: "lg:col-span-5",
    iconBg: "bg-secondary-light text-secondary",
  },
  {
    id: 3,
    title: "Volunteer & Make an Impact",
    description:
      "Be part of something bigger. Join upcoming events, connect with passionate people, and contribute your time to causes that matter.",
    icon: HeartHandshake,
    tag: "Become a Volunteer",
    href: "/events",
    size: "lg:col-span-5",
    iconBg: "bg-secondary-light text-secondary",
  },
  {
    id: 4,
    title: "Manage Your Activities",
    description:
      "Keep everything organized in one place. Track events you've created, review your joined campaigns, and manage your community involvement.",
    icon: Users,
    tag: "Visit Dashboard",
    href: "/dashboard",
    size: "lg:col-span-7",
    iconBg: "bg-primary-light text-primary",
  },
];

export const BentoFeatures: React.FC = () => {
  return (
    <section className="border-b border-border bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            What You Can Do
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Small Actions,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Lasting Impact.
            </span>
          </h2>

          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            Everything you need to discover opportunities, organize
            initiatives, and make a positive difference in your community.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className={`group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8 ${feature.size}`}
              >
                {/* Decorative Background */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />

                <div className="relative space-y-6">

                  {/* Icon */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg}`}>
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="max-w-xl space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="relative mt-8 border-t border-border pt-5">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                  >
                    {feature.tag}
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-muted/60 p-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">
              Ready to make a difference?
            </h3>
            <p className="text-sm text-muted-foreground">
              Find your next opportunity to give back to the community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Explore Events
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
};
