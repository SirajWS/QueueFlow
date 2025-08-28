import React, { forwardRef } from "react";
import clsx from "clsx";

const Button = forwardRef(({ className, variant="primary", size="md", ...props }, ref) => {
  const sizes = {
    sm: "px-2.5 py-1 text-sm",
    md: "px-3.5 py-2",
    lg: "px-4.5 py-2.5 text-base",
    icon: "p-2 aspect-square",
  };
  const variants = {
    primary:  "bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent",
    outline:  "bg-transparent border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)]",
    ghost:    "bg-transparent text-[var(--text)] hover:bg-[var(--surface-muted)] border border-transparent",
    danger:   "bg-rose-600 hover:bg-rose-700 text-white",
    subtle:   "bg-[var(--surface-muted)] text-[var(--text)] border border-[var(--border)]",
  };
  return (
    <button
      ref={ref}
      className={clsx(
        "rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40",
        sizes[size] || sizes.md,
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
export { Button };
export default Button;
