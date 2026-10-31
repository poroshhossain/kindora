import {
  Globe,
  HeartPulse,
  Mail,
  MapPin,
  Recycle,
  Snowflake,
  TreePine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

const categoryLinks = [
  { label: "Winter Blanket Drives", href: "/upcoming-events", icon: Snowflake },
  { label: "Urban Tree Plantations", href: "/upcoming-events", icon: TreePine },
  { label: "Clean City Campaigns", href: "/upcoming-events", icon: Recycle },
  { label: "Free Medical Posts", href: "/upcoming-events", icon: HeartPulse },
];

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com", icon: Globe },
  { label: "Email us", href: "mailto:hello@kindora.com", icon: Mail },
];

const linkClasses =
  "inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const socialClasses =
  "inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// `new Date()` is an unstable value and cannot run directly in a prerendered
// component while `cacheComponents` is enabled. Caching it bakes the year into
// the prerendered shell and only recomputes when the cache revalidates — ideal
// for a copyright year that changes once a year.
async function getCopyrightYear() {
  "use cache";
  return String(new Date().getFullYear());
}

const Footer = async () => {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/images/kindora-logo.png"
                alt="Kindora"
                width={150}
                height={100}
                className="h-auto w-32 object-contain"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Empowering communities to build, join, and track impactful social
              development events in local neighborhoods.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className={socialClasses}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Event categories">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Drive Categories
            </h2>
            <ul className="mt-4 space-y-3">
              {categoryLinks.map((category) => (
                <li key={category.label}>
                  <Link href={category.href} className={linkClasses}>
                    <category.icon className="size-4 text-primary" />
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect With Us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Questions or partnership ideas? We would love to hear from you.
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@kindora.com"
                  className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="size-4 text-primary" />
                  hello@kindora.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {await getCopyrightYear()} Kindora. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for community impact.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
