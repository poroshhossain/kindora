
export type EventType =
  | "cleanup"
  | "plantation"
  | "donation"
  | "food-distribution"
  | "blood-donation"
  | "awareness-campaign"
  | "other";

export interface EventRecord {
  _id: string;
  title: string;
  description: string;
  eventType: EventType ;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy: string | undefined;
}
