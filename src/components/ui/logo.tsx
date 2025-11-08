import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <path
        d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22 3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41Z"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
      />
      <path
        d="M22 35C29.1797 35 35 29.1797 35 22C35 14.8203 29.1797 9 22 9C14.8203 9 9 14.8203 9 22C9 29.1797 14.8203 35 22 35Z"
        fill="hsl(var(--accent))"
      />
      <path
        d="M24.7827 18.5L19.2173 24.0654C18.643 24.6397 18.643 25.5776 19.2173 26.1519L19.8481 26.7827C20.4224 27.357 21.3603 27.357 21.9346 26.7827L27.5 21.2173M24.7827 18.5L25.4135 17.8712C25.9878 17.2969 26.9257 17.2969 27.5 17.8712L28.1308 18.5C28.7051 19.0743 28.7051 20.0122 28.1308 20.5865L27.5 21.2173M24.7827 18.5L27.5 21.2173"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M34 12V32"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30 12C30 14.2091 31.7909 16 34 16C36.2091 16 38 14.2091 38 12"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
