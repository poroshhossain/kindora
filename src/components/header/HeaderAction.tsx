"use client";

import { Loader2, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { authClient, type Session } from "@/lib/auth-client";
import HeaderActionItem from "./HeaderActionItem";

export default function HeaderAction() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut();
    toast.success("Logged out successfully.");
    router.push("/");
  }

  if (isPending) {
    return (
      <Button variant="ghost" size="icon" className="cursor-default" disabled>
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </Button>
    );
  }

  if (!session) {
    return (
      <Button
        variant="default"
        size="sm"
        className="cursor-pointer px-3 font-medium"
        render={<Link href="/login" />}
      >
        Login
      </Button>
    );
  }

  return <SignedInHeaderAction session={session} onLogout={handleLogout} />;
}

function SignedInHeaderAction({
  session,
  onLogout,
}: {
  session: Session;
  onLogout: () => void;
}) {
  const user = session.user;
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
