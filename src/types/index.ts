export type EventCategory = 'Donation' | 'Cleanup' | 'Plantation' | 'Education';

export interface SocialEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventCategory;
  location: string;
  eventDate: string;
  image: string;
  organizerEmail?: string;
  joinedCount?: number;
}

export interface ImpactStat {
  label: string;
  value: string;
  subtext: string;
}