import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "default" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:   "bg-safety-blue text-white shadow-btn hover:bg-safety-blue-hover",
  secondary: "bg-surface border border-hairline text-ink-900 hover:border-ink-600 hover:bg-muted",
  ghost:     "bg-transparent text-ink-700 hover:bg-muted",
  danger:    "bg-alert-red text-white hover:bg-red-700",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm:      "px-5 py-3 text-sm",
  default: "px-6 py-3.5 text-sm",
  lg:      "px-8 py-4 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

export function buttonVariants({
  variant = "primary",
  size = "default",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return [BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
