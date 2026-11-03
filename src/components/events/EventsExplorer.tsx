
"use client";

import { useMemo, useState } from "react";
import { EventRecord } from "@/types/types";
import EventCard from "./EventCard";
import {
  CalendarDays,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

interface Props {
  events: EventRecord[];
}

const EventsExplorer = ({ events }: Props) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("upcoming");

  // Get unique event types dynamically
  const categories = useMemo(() => {
    const types = [...new Set(events.map((event) => event.eventType))];

    return ["All", ...types];
  }, [events]);

  // Search + Category + Sorting
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search by title and location
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }

    // Filter by event type
    if (activeCategory !== "All") {
      result = result.filter(
        (event) => event.eventType === activeCategory
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "latest") {
        return b.eventDate.localeCompare(a.eventDate);
      }

      return a.eventDate.localeCompare(b.eventDate);
    });

    return result;
  }, [events, search, activeCategory, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setSortBy("upcoming");
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-green-100/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-72 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold tracking-wide text-green-700">
            <Sparkles size={15} />
            MAKE A DIFFERENCE TOGETHER
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Discover Upcoming{" "}
                <span className="text-green-700">Events.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Find meaningful community activities, connect with
                people, and make a positive impact together.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {events.length}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Upcoming Events
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Panel */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 lg:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search events, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="relative lg:w-52">
              <SlidersHorizontal
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              >
                <option value="upcoming">Upcoming First</option>
                <option value="latest">Latest First</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Explore by category
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {category === "All" ? "All Events" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeCategory === "All"
                ? "Explore Events"
                : `${activeCategory} Events`}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </div>

          {(search || activeCategory !== "All" || sortBy !== "upcoming") && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              <X size={16} />
              Clear filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <Search size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No Events Found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find any events matching your search.
              Try another keyword or explore a different category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsExplorer;
