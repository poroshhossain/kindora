import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { insertEvent } from "@/lib/events";

const createEventSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  banner: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/.test(value),
      "Banner must be a valid URL.",
    )
    .optional(),
  date: z
    .string()
    .min(1)
    .refine(
      (value) => !Number.isNaN(new Date(value).getTime()),
      "Event date is invalid.",
    ),
  location: z.string().trim().min(1).max(160),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = createEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: parsed.error.issues[0]?.message ?? "Invalid event data.",
      },
      { status: 422 },
    );
  }

  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);

  try {
    const id = await insertEvent({
      title: parsed.data.title,
      description: parsed.data.description,
      banner: parsed.data.banner || undefined,
      date: new Date(parsed.data.date).toISOString(),
      location: parsed.data.location,
      postedByName: session?.user?.name || undefined,
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/events] MongoDB insert failed:", error);
    return NextResponse.json(
      {
        message:
          "Could not save the event — is the MongoDB server running? (MONGODB_URI in .env.local)",
      },
      { status: 503 },
    );
  }
}
