
"use client"

import {
    CalendarCheck,
    CalendarCog,
    CalendarPlus,
    LogOutIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import HeaderActionItem from "./HeaderActionItem"

interface UserType {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
}



const LogginUser = ({ user }: { user: UserType }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
                <AvatarImage src={user?.image ?? undefined} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar></Button>} />
            <DropdownMenuContent align="end" className="w-max">
                <DropdownMenuGroup className="w-max">
                    <HeaderActionItem />
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOutIcon />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default LogginUser


