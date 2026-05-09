import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({
  className,
  children,
  neonColor = "none",
}: {
  className?: string;
  children: React.ReactNode;
  neonColor?: "red" | "teal" | "none";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
        neonColor === "red" && "shadow-[0_0_15px_rgba(220,38,38,0.5)] border-red-500/30",
        neonColor === "teal" && "shadow-[0_0_15px_rgba(20,184,166,0.5)] border-teal-500/30",
        className
      )}
    >
      {/* Optional subtle checkerboard or reflection effect could go here */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
