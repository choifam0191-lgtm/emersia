import { type HTMLAttributes } from "react";

type Variant = "default" | "elevated" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  default:  "bg-surface border border-hairline shadow-card rounded-xl p-6",
  elevated: "bg-surface border border-hairline shadow-elevated rounded-xl p-6",
  ghost:    "border border-hairline rounded-xl p-6",
};

type CardProps = HTMLAttributes<HTMLDivElement> & { variant?: Variant };

export function Card({ variant = "default", className = "", ...props }: CardProps) {
  return (
    <div
      className={[VARIANT_CLASSES[variant], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
