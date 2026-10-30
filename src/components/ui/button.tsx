import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white text-black hover:bg-white/90 shadow-sm",
      ghost: "hover:bg-white/10 text-white",
      outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
      secondary: "bg-white/10 text-white hover:bg-white/20",
    }[variant] ?? "";

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-sm rounded-md",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8 text-base",
      icon: "h-9 w-9 p-0 flex items-center justify-center rounded-lg",
    }[size] ?? "";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
