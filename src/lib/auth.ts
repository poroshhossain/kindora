import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const db = new Kysely({
  dialect: new SqliteDialect({
    database: new Database("./auth.db"),
  }),
});

export const auth = betterAuth({
  database: { db, type: "sqlite" },
  emailAndPassword: {
    enabled: true,
    // No email verification for the examiner demo
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
});
