import { Suspense } from "react";

import Features from "@/components/home/features";
import Gallery from "@/components/home/gallery";
import Hero from "@/components/home/hero";
import Newsletter from "@/components/home/newsletter";
import RecentEvents from "@/components/home/recent-events";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      {/* Events are read live from MongoDB on every request — the prerendered
          shell streams them in at request time (cacheComponents pattern). */}
      <Suspense
        fallback={
          <section className="border-b border-border bg-muted/40">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-muted-foreground">
                Loading upcoming events…
              </p>
            </div>
          </section>
        }
      >
        <RecentEvents />
      </Suspense>
      <Gallery />
      <Newsletter />
    </>
  );
}
