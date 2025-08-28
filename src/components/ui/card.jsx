import React from "react";
import clsx from "clsx";

/* Variants: soft | outline | ghost */
export function Card({ className, variant = "soft", compact = false, ...props }) {
  const base = "rounded-lg border transition-colors shadow-[var(--shadow)]";
  const styles = {
    soft:    "bg-[var(--panel)] border-[var(--border)] text-[var(--text)]",
    outline: "bg-transparent border-[var(--border)] text-[var(--text)]",
    ghost:   "bg-transparent border-transparent shadow-none text-[var(--text)]",
  };
  return (
    <div className={clsx(base, styles[variant], "hover:shadow-lg/80 transition-shadow", className)} data-compact={compact ? "" : undefined} {...props}/>
  );
}
export function CardHeader({ className, compact = false, ...props }) {
  return <div className={clsx(compact ? "p-3" : "p-4","border-b border-[var(--border)]")} {...{className,...props}}/>;
}
export function CardTitle({ className, compact = false, ...props }) {
  return <h3 className={clsx(compact ? "text-base font-semibold":"text-lg font-semibold", className)} {...props}/>;
}
export function CardContent({ className, compact = false, ...props }) {
  return <div className={clsx(compact ? "p-3":"p-4", className)} {...props}/>;
}
export function CardFooter({ className, compact = false, ...props }) {
  return <div className={clsx(compact ? "p-3 pt-0":"p-4 pt-0", className)} {...props}/>;
}
