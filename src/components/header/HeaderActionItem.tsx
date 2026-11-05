import { CalendarCheck, CalendarCog, CalendarPlus } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ActionLinks from "./ActionLinks";

const headerLinks = [
  { label: "Create Event", path: "/create-event", icon: CalendarPlus },
  { label: "Manage Events", path: "/manage-events", icon: CalendarCog },
  { label: "Join Event", path: "/join-events", icon: CalendarCheck },
];

const HeaderActionItem = () => {
  return (
    <>
      {headerLinks.map((item) => (
        <DropdownMenuItem key={item.path}>
          <ActionLinks item={item} />
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default HeaderActionItem;