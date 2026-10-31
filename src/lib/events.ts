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

/**
 * Fetches the most recent upcoming events sorted by date, taking only the
 * first `limit` documents off the cursor (.limit() MongoDB operator).
 */
export async function getRecentEvents(limit = 6): Promise<EventRecord[]> {
  const db = await getDb();

  const eventsCollection = db.collection("events");
  const cursor = eventsCollection.find({}).sort({ date: 1 }).limit(limit);

  const events = await cursor.toArray();

  return events.map((event) => ({
    id: String(event._id),
    title: String(event.title ?? "Untitled event"),
    description: String(event.description ?? ""),
    image: String(event.banner ?? event.image ?? ""),
    date: new Date(event.date).toISOString(),
    location: String(event.location ?? ""),
    postedByName: event.postedByName ? String(event.postedByName) : undefined,
  }));
}
