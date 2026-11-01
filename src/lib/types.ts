/** Shape of an event as returned by the Kindora REST API. */
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
