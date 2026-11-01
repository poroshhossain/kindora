"use client";

import { LogOutIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeaderActionItem from "./HeaderActionItem";

/**
 * Minimal user shape for the account dropdown UI.
 * Adapt it (or swap for your own type) when you wire up custom auth.
 */
export type AuthUser = {
  name?: string | null;
  email: string;
  image?: string | null;
};

/**
 * Signed-in account dropdown. UI only — render it from HeaderAction (or
 * anywhere else) once your custom auth provides a user.
 */
export function SignedInHeaderAction({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) {
  const fallback = user.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
    : (user.email[0]?.toUpperCase() ?? "U");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer rounded-full"
            aria-label="Account menu"
          >
            <Avatar>
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name ?? user.email}
              />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-max">
        <DropdownMenuLabel>
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <HeaderActionItem />
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function HeaderAction() {
  // TODO: wire up your custom auth here — render a loading state while the
  // session resolves, and <SignedInHeaderAction user={...} onLogout={...} />
  // (with your own sign-out logic) when a user is signed in.
  return (
    <Button
      variant="default"
      size="sm"
      className="cursor-pointer px-3 font-medium"
      nativeButton={false}
      render={<Link href="/login" />}
    >
      Login
    </Button>
  );
}
