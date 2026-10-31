import Image from "next/image";

type GalleryItem = {
  /** Stable picsum photo IDs */
  id: number;
  caption: string;
};

const galleryItems: GalleryItem[] = [
  { id: 102, caption: "Free medical check-up camp" },
  { id: 330, caption: "Winter clothing drive" },
  { id: 442, caption: "Tree plantation day" },
  { id: 566, caption: "After-school learning camp" },
  { id: 684, caption: "Community food distribution" },
  { id: 823, caption: "River cleanup mission" },
  { id: 164, caption: "Youth leadership workshop" },
  { id: 129, caption: "Blood donation programs" },
  { id: 229, caption: "Eco-art for a greener city" },
];

export default function Gallery() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="text-sm font-semibold tracking-wide text-secondary uppercase">
            Moments of impact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From our community gallery
          </h2>
          <p className="text-muted-foreground">
            Glimpses from past volunteering events across neighborhoods —
            hundreds of hands working together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <figure
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10"
            >
              <Image
                src={`https://picsum.photos/id/${item.id}/640/480`}
                alt={item.caption}
                width={640}
                height={480}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
