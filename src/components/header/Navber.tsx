
"use client";

import {
  CalendarCheck,
  CalendarCog,
  CalendarDays,
  CalendarPlus,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeToggle from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";

import LogginUser from "./LogginUser";
import Logo from "./Logo";

const navItems = [
  {
    label: "Upcoming Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
];

const headerLinks = [
  {
    label: "Create Event",
    href: "/create-event",
    icon: CalendarPlus,
  },
  {
    label: "Manage Events",
    href: "/manage-events",
    icon: CalendarCog,
  },
  {
    label: "Join Event",
    href: "/join-events",
    icon: CalendarCheck,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setIsOpen(false);

  const links = [
    ...navItems,
    ...(session?.user ? headerLinks : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="ml-3 flex items-center gap-2 border-l border-border pl-3">
            <ThemeToggle />

            {session?.user ? (
              <LogginUser user={session.user} />
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="border-t border-border bg-background px-4 py-3 md:hidden sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          <ul className="flex flex-col gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Authentication */}
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
            {session?.user ? (
              <LogginUser user={session.user} />
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
