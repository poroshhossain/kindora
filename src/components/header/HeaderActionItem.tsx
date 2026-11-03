import { CalendarCheck, CalendarCog, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const headerLinks = [
  { lavel: " Create Event", path: "/create-event", icon: CalendarPlus },
  { lavel: " Manage Events", path: "/manage-events", icon: CalendarCog },
  { lavel: " join Event", path: "/join-events", icon: CalendarCheck },
];
const HeaderActionItem = () => {
  return (
    <>
      {headerLinks.map((item) => {
        const Icon = item.icon;
        return (
          <DropdownMenuItem key={item.lavel}>
            <Link href={item.path} className="flex items-center gap-2">
              <Icon size={3} />
              {item.lavel}
            </Link>
          </DropdownMenuItem>
        );
      })}
    </>
  );
};
export default HeaderActionItem;
