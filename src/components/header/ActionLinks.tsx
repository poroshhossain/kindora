import Link from "next/link";
import { CalendarCheck, CalendarCog, CalendarPlus } from "lucide-react";

interface ActionLink {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface ActionLinksProps {
  item: ActionLink;
}


const ActionLinks = ({ item }: ActionLinksProps) => {
  const Icon = item.icon;

  return (
    <Link href={item.path} className="flex items-center gap-2">
      <Icon size={16} />
      {item.label}
    </Link>
  );
};

export default ActionLinks;