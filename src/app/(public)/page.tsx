import { Suspense } from "react";
import { BentoFeatures } from "@/components/HomeCom/BentoFeatures";
import { HeroSection } from "@/components/HomeCom/HeroSection";
import { ImpactStats } from "@/components/HomeCom/ImpactStats";
import { NewsletterCTA } from "@/components/HomeCom/NewsletterCTA";
import { PhotoGallery } from "@/components/HomeCom/PhotoGallery";
import { RecentEventsGrid } from "@/components/HomeCom/RecentEventsGrid";
import type { SocialEvent } from "@/types";

const mockEvents: SocialEvent[] = [
  {
    _id: "1",
    title: "Winter Clothes Distribution",
    description:
      "Providing warm winter jackets and sweaters to cold-affected families.",
    eventType: "Donation",
    location: "Mirpur 10, Dhaka",
    eventDate: "2026-12-15",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800",
    organizerEmail: "admin@kindgather.org",
  },
  {
    _id: "2",
    title: "Blanket Drive for Needy",
    description:
      "Distributing thick fleece blankets to homeless individuals living on streets.",
    eventType: "Donation",
    location: "Mohammadpur, Dhaka",
    eventDate: "2026-12-20",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800",
    organizerEmail: "volunteers@kindgather.org",
  },
  {
    _id: "3",
    title: "Urban Tree Plantation",
    description: "Planting 500 fruit and shade trees along school premises.",
    eventType: "Plantation",
    location: "Dhanmondi, Dhaka",
    eventDate: "2026-11-28",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    organizerEmail: "green@kindgather.org",
  },
  {
    _id: "4",
    title: "Clean River Bank Drive",
    description:
      "Cleaning plastic waste and debris along Sadarghat river front.",
    eventType: "Cleanup",
    location: "Sadarghat, Dhaka",
    eventDate: "2026-12-05",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800",
    organizerEmail: "clean@kindgather.org",
  },
  {
    _id: "5",
    title: "Primary Education Books Distro",
    description:
      "Free textbook and stationery pack distribution for primary kids.",
    eventType: "Education",
    location: "Uttara Sector 7, Dhaka",
    eventDate: "2026-12-10",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
    organizerEmail: "edu@kindgather.org",
  },
  {
    _id: "6",
    title: "Voluntary Blood Donation Camp",
    description: "Collecting emergency blood supply for local medical centers.",
    eventType: "Donation",
    location: "Farmgate, Dhaka",
    eventDate: "2026-12-18",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800",
    organizerEmail: "health@kindgather.org",
  },
];

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactStats />
      <BentoFeatures />

      <Suspense fallback={<p>Loading upcoming events...</p>}>
        <RecentEventsGrid events={mockEvents} />
      </Suspense>
      <PhotoGallery />
      <NewsletterCTA />
    </>
  );
}
