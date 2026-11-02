import { Suspense } from "react";

import Features from "@/components/home/features";
import Gallery from "@/components/home/gallery";
import Hero from "@/components/home/hero";
import Newsletter from "@/components/home/newsletter";
import RecentEvents from "@/components/home/recent-events";
import { HeroSection } from "@/components/HomeCom/HeroSection";
import { ImpactStats } from "@/components/HomeCom/ImpactStats";
import { BentoFeatures } from "@/components/HomeCom/BentoFeatures";
import { RecentEventsGrid } from "@/components/HomeCom/RecentEventsGrid";
import { API_BASE_URL } from "@/lib/api";
import { SocialEvent } from "@/types";
import { EventRecord } from "@/lib/types";
import { PhotoGallery } from "@/components/HomeCom/PhotoGallery";
import { NewsletterCTA } from "@/components/HomeCom/NewsletterCTA";

const mockEvents: SocialEvent[] = [
  {
    _id: '1',
    title: 'Winter Clothes Distribution',
    description: 'Providing warm winter jackets and sweaters to cold-affected families.',
    eventType: 'Donation',
    location: 'Mirpur 10, Dhaka',
    eventDate: '2026-12-15',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
    organizerEmail: 'admin@kindgather.org',
  },
  {
    _id: '2',
    title: 'Blanket Drive for Needy',
    description: 'Distributing thick fleece blankets to homeless individuals living on streets.',
    eventType: 'Donation',
    location: 'Mohammadpur, Dhaka',
    eventDate: '2026-12-20',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800',
    organizerEmail: 'volunteers@kindgather.org',
  },
  {
    _id: '3',
    title: 'Urban Tree Plantation',
    description: 'Planting 500 fruit and shade trees along school premises.',
    eventType: 'Plantation',
    location: 'Dhanmondi, Dhaka',
    eventDate: '2026-11-28',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    organizerEmail: 'green@kindgather.org',
  },
  {
    _id: '4',
    title: 'Clean River Bank Drive',
    description: 'Cleaning plastic waste and debris along Sadarghat river front.',
    eventType: 'Cleanup',
    location: 'Sadarghat, Dhaka',
    eventDate: '2026-12-05',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800',
    organizerEmail: 'clean@kindgather.org',
  },
  {
    _id: '5',
    title: 'Primary Education Books Distro',
    description: 'Free textbook and stationery pack distribution for primary kids.',
    eventType: 'Education',
    location: 'Uttara Sector 7, Dhaka',
    eventDate: '2026-12-10',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    organizerEmail: 'edu@kindgather.org',
  },
  {
    _id: '6',
    title: 'Voluntary Blood Donation Camp',
    description: 'Collecting emergency blood supply for local medical centers.',
    eventType: 'Donation',
    location: 'Farmgate, Dhaka',
    eventDate: '2026-12-18',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800',
    organizerEmail: 'health@kindgather.org',
  },
];

export default async function HomePage() {

  return (
    <>
      {/* <Hero />
      <Features />
   

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
      <Newsletter /> */}

      <HeroSection />
      <ImpactStats />
      <BentoFeatures />

      <Suspense fallback={<p>Loading upcoming events...</p>}>
        <RecentEventsGrid events={mockEvents} />
      </Suspense>
      <PhotoGallery />
      <NewsletterCTA/>

    </>
  );
}
