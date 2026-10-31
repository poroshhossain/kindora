"use client";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-14 text-white shadow-xl sm:px-12">
          {/* Decorative pattern blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <Mail className="size-6" />
            </span>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Never miss a chance to help
              </h2>
              <p className="text-white/85">
                Subscribe to the Kindora newsletter and get upcoming community
                events, volunteer stories and impact updates right in your
                inbox.
              </p>
            </div>

            {/* Design only — submission is intentionally not wired up */}
            <form
              className="mt-2 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="h-11 flex-1 border-white/30 bg-white/95 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="button"
                size="lg"
                className="h-11 bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90"
              >
                Subscribe
              </Button>
            </form>

            <p className="text-xs text-white/70">
              One email a month. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
