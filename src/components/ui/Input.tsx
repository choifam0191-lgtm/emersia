import { type InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { error?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          "h-12 w-full rounded-lg border bg-muted px-4 text-sm text-ink-900 transition-colors",
          "placeholder:text-mist focus:bg-surface focus:outline-none focus:ring-2",
          error
            ? "border-alert-red ring-2 ring-alert-red"
            : "border-hairline focus:border-safety-blue focus:ring-safety-blue/20",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
