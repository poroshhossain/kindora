import type React from "react";
import type { ImpactStat } from "@/types";

const stats: ImpactStat[] = [
  {
    label: "Total Events Conducted",
    value: "1,240+",
    subtext: "Across 32 Districts",
  },
  {
    label: "Active Volunteers",
    value: "18,500+",
    subtext: "Registered & Engaged",
  },
  {
    label: "Lives Impacted",
    value: "85,000+",
    subtext: "Direct Beneficiaries",
  },
  {
    label: "Community Support",
    value: "99.4%",
    subtext: "Verified Transparency",
  },
];

export const ImpactStats: React.FC = () => {
  return (
    <section className="border-b border-border bg-surface py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {stats.map((stat, _idx) => (
          <div
            key={stat.label}
            className="group space-y-2 text-center lg:text-left"
          >
            {/* Stat Value */}
            <p className="text-3xl font-extrabold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-4xl">
              {stat.value}
            </p>

            {/* Stat Label */}
            <p className="text-sm font-bold text-primary sm:text-base">
              {stat.label}
            </p>

            {/* Stat Description */}
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {stat.subtext}
            </p>

            {/* Decorative Accent */}
            <div className="mx-auto h-1 w-8 rounded-full bg-secondary/70 transition-all duration-300 group-hover:w-14 lg:mx-0" />
          </div>
        ))}
      </div>
    </section>
  );
};
