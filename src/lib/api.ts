import { toast } from "sonner";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


// Join Events Api
export const postJoinEvent = async (id: string, email: string | null | undefined) => {
    try {
        const res = await fetch(`${API_BASE_URL}/events/${id}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userEmail: email
            })
        })

        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || "Failed to join event");
        }
        return result
    } catch (error) {
        toast.error(
            error instanceof Error
                ? error.message
                : "Failed to join event"
        );
    }
}


export const getEventsApi = async () => {

    try {
        const res = await fetch(`${API_BASE_URL}/events`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        return data
    } catch (error) {
        console.error("Events fetching error:", error);
    }
}

export const postEventApi = async (eventData: any) => {
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