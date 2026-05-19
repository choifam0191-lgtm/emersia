import { type TextareaHTMLAttributes, forwardRef } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={[
          "w-full resize-y rounded-lg border bg-muted px-4 py-3 text-sm text-ink-900 transition-colors",
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
Textarea.displayName = "Textarea";
