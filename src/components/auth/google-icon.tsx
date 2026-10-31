import { cn } from "cn";

/** Google brand mark — lucide-react v1.x has no brand icons, so it's inlined here. */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.58-5.16 3.58-8.81"
      />
      <path
        fill="#34A853"
        d="M12 24c3.22 0 5.93-1.08 7.9-2.92l-3.87-3c-1.08.72-2.45 1.15-4.03 1.15-3.1 0-5.73-2.1-6.67-4.92H1.34v3.1A11.99 11.99 0 0 0 12 24"
      />
      <path
        fill="#FBBC05"
        d="M5.33 14.31a7.2 7.2 0 0 1 0-4.62V6.6H1.34a12 12 0 0 0 0 10.8z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.75 0 3.32.6 4.55 1.79l3.42-3.42C17.92 1.19 15.22 0 12 0 7.32 0 3.26 2.6 1.34 6.6l3.99 3.1C6.27 6.87 8.9 4.77 12 4.77"
      />
    </svg>
  );
}
