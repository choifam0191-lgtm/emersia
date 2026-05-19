import { type HTMLAttributes } from "react";

type Variant = "default" | "brand" | "success" | "warning" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-muted text-ink-600",
  brand:   "bg-safety-blue-soft text-safety-blue",
  success: "bg-green-50 text-success-green",
  warning: "bg-amber-50 text-amber-600",
  danger:  "bg-red-50 text-alert-red",
};

const BASE = "inline-block rounded-full px-2.5 py-1 text-xs font-medium";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { variant?: Variant };

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={[BASE, VARIANT_CLASSES[variant], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
