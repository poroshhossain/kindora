import { Plus, Settings2, Ticket } from "lucide-react";

import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const accountMenuItems = [
  {
    label: "Create Event",
    href: "/create-event",
    icon: Plus,
  },
  {
    label: "Manage Events",
    href: "/manage-events",
    icon: Settings2,
  },
  {
    label: "Joined Events",
    href: "/joined-events",
    icon: Ticket,
  },
];

export default function HeaderActionItem() {
  return (
    <>
      {accountMenuItems.map((item) => {
        const Icon = item.icon;

        return (
          <DropdownMenuItem
            key={item.href}
            render={<Link href={item.href} />}
            className="whitespace-nowrap py-2"
          >
            <Icon className="size-4" />
            {item.label}
          </DropdownMenuItem>
        );
      })}
    </>
  );
}
