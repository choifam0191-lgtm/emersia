import { type SelectHTMLAttributes, forwardRef } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={[
          "h-12 w-full rounded-lg border border-hairline bg-muted px-4 text-sm text-ink-900 transition-colors",
          "focus:border-safety-blue focus:bg-surface focus:outline-none focus:ring-2 focus:ring-safety-blue/20",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }
);
Select.displayName = "Select";
