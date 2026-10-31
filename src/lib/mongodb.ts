import { MongoClient } from "mongodb";

/**
 * Cached MongoDB client (survives dev-server module reloads via globalThis).
 * re https://www.mongodb.com/developer/languages/typescript/nextjs-strict-mode-caching/
 */
declare global {
  var __kindoraMongoClient: MongoClient | undefined;
}

export function getMongoClient(): MongoClient {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local, e.g. mongodb://localhost:27017",
    );
  }

  globalThis.__kindoraMongoClient ??= new MongoClient(uri, {
    serverSelectionTimeoutMS: 3000,
  });

  return globalThis.__kindoraMongoClient;
}

export async function getDb() {
  const client = getMongoClient();
  await client.connect();
  return client.db(process.env.MONGODB_DB ?? "kindora");
}
