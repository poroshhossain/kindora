import { Suspense } from "react";
import { BentoFeatures } from "@/components/HomeCom/BentoFeatures";
import { HeroSection } from "@/components/HomeCom/HeroSection";
import { ImpactStats } from "@/components/HomeCom/ImpactStats";
import { NewsletterCTA } from "@/components/HomeCom/NewsletterCTA";
import { PhotoGallery } from "@/components/HomeCom/PhotoGallery";
import { RecentEventsGrid } from "@/components/HomeCom/RecentEventsGrid";
import { Loading } from "@/components/sheardData/Loading";


export default async function HomePage() {

  return (
    <>
      <HeroSection />
      <ImpactStats />
      <BentoFeatures />

      <Suspense fallback={<Loading/>}>
        <RecentEventsGrid/>
      </Suspense>
      <PhotoGallery />
      <NewsletterCTA />
    </>
  );
}
