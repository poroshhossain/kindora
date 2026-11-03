import type { Metadata } from "next";

// CSS, fonts and Toaster are provided by the root layout in (public)/layout.tsx.
// Nested route-group layouts must not render <html>/<body>.

export const metadata: Metadata = {
  title: "Kindora — Sign in",
  description: "Sign in or create your Kindora account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      {children}
    </div>
  );
}
