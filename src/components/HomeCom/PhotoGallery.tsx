import { ArrowUpRight, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
    title: "Winter Clothes Distribution",
    category: "Community Support",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=700",
    title: "Urban Plantation Drive",
    category: "Environment",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700",
    title: "Children Education Support",
    category: "Education",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700",
    title: "Food & Relief Distribution",
    category: "Humanitarian Aid",
    span: "md:col-span-2 md:row-span-1",
  },
];

export const PhotoGallery: React.FC = () => {
  return (
    <section className="border-b border-border bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
            <Images size={14} />
            Impact Gallery
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Moments of{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Social Change.
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Every small act of kindness creates a lasting impact. Explore
            moments of compassion, collaboration, and positive change in our
            communities.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[200px] lg:auto-rows-[230px]">
          {galleryImages.map((item) => (
            <div
              key={item.title}
              className={`group relative isolate overflow-hidden rounded-2xl border border-border bg-muted ${item.span}`}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Category Badge */}
              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:text-xs">
                {item.category}
              </span>

              {/* Image Caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                  {item.title}
                </h3>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center justify-center gap-4 pt-2 text-center">
          <p className="text-sm text-muted-foreground">
            Want to be part of the next meaningful moment?
          </p>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Explore Community Events
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};
