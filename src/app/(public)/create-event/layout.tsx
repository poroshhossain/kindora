import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event",
  description: "Host a community service event on Kindora",
};

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
