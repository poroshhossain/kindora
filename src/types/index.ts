export interface SocialEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  location: string;
  eventDate: string;
  image: string;
  organizerEmail: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  subtext: string;
}
