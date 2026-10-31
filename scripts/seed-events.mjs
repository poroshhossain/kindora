/**
 * Seeds the `events` collection with sample community-service events.
 * Usage: node scripts/seed-events.mjs
 *
 * Requires a running MongoDB and MONGODB_URI in .env.local.
 * Safe to re-run: it clears the collection first.
 *
 * Read with npm run seed? (no script needed)
 */
import { readFileSync } from "node:fs";
import { MongoClient } from "mongodb";

// Minimal .env.local reader (node --env-file supports it too)
function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf8");
    for (const line of raw.split("\n")) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]])
        process.env[match[1]] = match[2].trim();
    }
  } catch {}
}
loadEnv();

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB ?? "kindora";

const DAY = 24 * 60 * 60 * 1000;
const inDays = (days) => new Date(Date.now() + days * DAY);

const events = [
  {
    title: "Citywide Tree Plantation Drive",
    description:
      "Plant 1,000 saplings across parks and schoolyards with local volunteers. Gloves, tools and refreshments provided.",
    banner: "https://picsum.photos/id/442/800/500",
    date: inDays(3),
    location: "Ramsagar Park, Main Gate",
    postedByName: "Sadia Rahman",
  },
  {
    title: "Winter Warmth: Blanket Distribution",
    description:
      "Hand out blankets and warm clothes to street communities ahead of the cold season.",
    banner: "https://picsum.photos/id/330/800/500",
    date: inDays(6),
    location: "Karwan Bazar Junction",
    postedByName: "Tanvir Hasan",
  },
  {
    title: "Weekend Food Bank Volunteer Day",
    description:
      "Pack and distribute grocery kits to 200 struggling families. Two shifts, morning and afternoon.",
    banner: "https://picsum.photos/id/684/800/500",
    date: inDays(8),
    location: "Kindora Community Hall",
    postedByName: "Maria Islam",
  },
  {
    title: "Free Blood Donation Camp",
    description:
      "In partnership with the central blood bank. Donors get a free health screening on the spot.",
    banner: "https://picsum.photos/id/129/800/500",
    date: inDays(11),
    location: "Central Hospital Lobby",
    postedByName: "Rafiq Chowdhury",
  },
  {
    title: "River Cleanup Mission",
    description:
      "Collect plastics and waste along the riverbank; safety gear and boats arranged by the city council.",
    banner: "https://picsum.photos/id/823/800/500",
    date: inDays(15),
    location: "Mohakhali Riverbank",
    postedByName: "EnviroKind Club",
  },
  {
    title: "After-School Learning Camp",
    description:
      "Tutor children of day laborers in math, English and science. Teaching experience is welcome but not required.",
    banner: "https://picsum.photos/id/566/800/500",
    date: inDays(19),
    location: "Baganbari Primary School",
    postedByName: "Nusrat Jahan",
  },
  {
    title: "Youth Leadership & Public Speaking Workshop",
    description:
      "A one-day workshop to help young volunteers build communication and community-organizing skills.",
    banner: "https://picsum.photos/id/164/800/500",
    date: inDays(24),
    location: "Kindora Community Hall",
    postedByName: "Arif Mahmud",
  },
  {
    title: "Neighborhood Cleanup & Eco-Art Fair",
    description:
      "Clean the blocks, then turn the collected waste into art. Prizes for the best eco-installations.",
    banner: "https://picsum.photos/id/229/800/500",
    date: inDays(30),
    location: "Shonadanga Footpath Market",
    postedByName: "GreenSteps Initiative",
  },
];

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });

try {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("events");

  await collection.deleteMany({});
  const result = await collection.insertMany(events);
  console.log(
    `Seeded ${result.insertedCount} events into ${dbName}.events (MONGODB_URI=${uri})`,
  );
} finally {
  await client.close();
}
