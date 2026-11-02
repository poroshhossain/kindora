import { CalendarCheck, CalendarCog, CalendarPlus } from "lucide-react"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import Link from "next/link"

const headerLinks = [
    { lavel: ' Create Event', path: '/create-event', icon: CalendarPlus },
    { lavel: ' Manage Events', path: '/', icon: CalendarCog },
    { lavel: ' join Event', path: '/join-events', icon: CalendarCheck },
]
const HeaderActionItem = () => {
    return (
        <>
            {
                headerLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                        <DropdownMenuItem key={item.lavel}>
                            <Link href={item.path} className="flex items-center gap-2" >
                               <Icon/>
                                {item.lavel}</Link>
                        </DropdownMenuItem>
                    )
                })
            }

        </>
    )
}
export default HeaderActionItem