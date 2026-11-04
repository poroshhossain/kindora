import { toast } from "sonner";
import type { EventRecord } from "../types/types";
import { authClient } from "./auth-client";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export interface UpdateEventData {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}



export const getTokenClient = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Unauthorized");
  }

  return data.token;
};

export const getLeaveEvent = async (id: string) => {
  const token = await getTokenClient();

  const res = await fetch(`${API_BASE_URL}/events/${id}/join`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );

  const data = await res.json();

  return data
};

// Join Events Api
export const postJoinEvent = async (
  id: string,
  email: string | null | undefined,
) => {
  try {
    const token = await getTokenClient();
    const res = await fetch(`${API_BASE_URL}/events/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`

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


export const getEventsApi = async () => {
  const res = await fetch(`${API_BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
};

export const postEventApi = async (eventData: Omit<EventRecord, "_id">) => {
  const token = await getTokenClient();
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(eventData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create event.");
  }

  return result;
};



export const updateEventApi = async (
  id: string,
  userEmail: string,
  data: UpdateEventData,
) => {
  const token = await getTokenClient();
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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
  const token = await getTokenClient();
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userEmail }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete event.");
  }

  return result;
};




export const getRecentEvents = async (): Promise<EventRecord[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/recent-events`);

    if (!res.ok) {
      throw new Error("Failed to fetch recent events");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request was aborted");
      return [];
    }

    console.error("Recent Events Error:", error);
    return [];
  }
};