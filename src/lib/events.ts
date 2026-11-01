import { getDb } from "@/lib/mongodb";

export type EventRecord = {
  id: string;
  title: string;
  description: string;
  image: string;
  /** ISO date string (serialized) */
  date: string;
  location: string;
  postedByName?: string;
};

export type CreateEventInput = {
  title: string;
  description: string;
  banner?: string;
  /** ISO date string */
  date: string;
  location: string;
  postedByName?: string;
};

function mapEvent(event: {
  _id: unknown;
  title?: unknown;
  description?: unknown;
  banner?: unknown;
  image?: unknown;
  date?: unknown;
  location?: unknown;
  postedByName?: unknown;
}): EventRecord {
  return {
    id: String(event._id),
    title: String(event.title ?? "Untitled event"),
    description: String(event.description ?? ""),
    image: String(event.banner ?? event.image ?? ""),
    date: new Date(event.date as string | number | Date).toISOString(),
    location: String(event.location ?? ""),
    postedByName: event.postedByName ? String(event.postedByName) : undefined,
  };
}

/**
 * The most recent upcoming events sorted by date, taking only the first
 * `limit` documents off the cursor (.limit() MongoDB operator).
 */
export async function getRecentEvents(limit = 6): Promise<EventRecord[]> {
  const db = await getDb();

  const eventsCollection = db.collection("events");
  const cursor = eventsCollection.find({}).sort({ date: 1 }).limit(limit);

  return (await cursor.toArray()).map(mapEvent);
}

/** All community events sorted by date (no truncation) — used by /upcoming-events. */
export async function getAllEvents(): Promise<EventRecord[]> {
  const db = await getDb();

  const eventsCollection = db.collection("events");
  const cursor = eventsCollection.find({}).sort({ date: 1 });

  return (await cursor.toArray()).map(mapEvent);
}

/** Inserts a new event document into the `events` collection. */
export async function insertEvent(input: CreateEventInput) {
  const db = await getDb();

  const result = await db.collection("events").insertOne({
    title: input.title,
    description: input.description,
    banner: input.banner ?? "",
    date: new Date(input.date),
    location: input.location,
    ...(input.postedByName ? { postedByName: input.postedByName } : {}),
  });

  return String(result.insertedId);
}
