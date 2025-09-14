import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50",
          active
            ? "bg-primary text-primary-foreground cursor-default"
            : "bg-background text-foreground hover:bg-muted",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
