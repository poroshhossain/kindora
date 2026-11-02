
import React from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export const NewsletterCTA: React.FC = () => {
  return (
    <section className="bg-muted/40 border-y border-border px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/20 bg-surface px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary-light px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary">
            <Sparkles size={14} />
            Stay Connected
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Be Part of Something{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Meaningful.
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Get updates about upcoming community events, volunteer
            opportunities, and meaningful initiatives happening around you.
          </p>

          {/* Newsletter Form */}
          <form
           
            className="mx-auto flex max-w-xl flex-col gap-3 pt-2 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Mail size={19} className="shrink-0 text-muted-foreground" />

              <input
                type="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Subscribe
              <ArrowRight size={17} />
            </button>
          </form>

          <p className="text-xs text-muted-foreground">
            Stay informed. Make an impact. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
