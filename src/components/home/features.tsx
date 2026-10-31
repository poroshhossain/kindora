import type { LucideIcon } from "lucide-react";
import {
  CalendarPlus,
  HandHeart,
  MapPin,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: CalendarPlus,
    title: "Create events in minutes",
    description:
      "Host a food drive, cleanup camp or fundraiser — banners, dates and locations on one simple form.",
  },
  {
    icon: HandHeart,
    title: "Volunteer with one click",
    description:
      "Join any cause around you instantly. Your spot is saved the moment you register.",
  },
  {
    icon: Ticket,
    title: "Keep track of your tickets",
    description:
      "Every event you join is saved to your dashboard so you never miss a meet-up.",
  },
  {
    icon: MapPin,
    title: "Discover causes nearby",
    description:
      "Browse community events by location and date and find where you are needed most.",
  },
  {
    icon: Users,
    title: "Grow your community",
    description:
      "Meet like-minded volunteers, organizers and donors who share your passion for change.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & verified accounts",
    description:
      "Password-protected accounts with Google sign-in keep your contributions connected to you.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            Why Kindora
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to give back
          </h2>
          <p className="text-muted-foreground">
            From organizing your own initiative to joining one nearby — Kindora
            is built to make doing good easier.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <span className="mb-1 inline-flex size-10 items-center justify-center rounded-lg bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
