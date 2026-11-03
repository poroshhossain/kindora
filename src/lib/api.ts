import { toast } from "sonner";
import type { EventRecord } from "../types/types";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Join Events Api
export const postJoinEvent = async (
  id: string,
  email: string | null | undefined,
) => {
  try {
    const res = await fetch(`${API_BASE_URL}/events/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to join event");
    }
    return result;
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Failed to join event",
    );
  }
};

// Uncached data fetch for server components.
// Do NOT wrap this in try/catch: while prerendering, Next.js rejects the fetch
// with HANGING_PROMISE_REJECTION to bail out of the static pass, and React
// must observe it to defer rendering to request time.
export const getEventsApi = async () => {
  const res = await fetch(`${API_BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
};

export const postEventApi = async (eventData: Omit<EventRecord, "_id">) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create event.");
  }

  return result;
};

export interface UpdateEventData {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export const updateEventApi = async (
  id: string,
  userEmail: string,
  data: UpdateEventData,
) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail,
      data,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update event.");
  }

  return result;
};

export const deleteEventApi = async (id: string, userEmail: string) => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userEmail }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete event.");
  }

  return result;
};
