import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-none",
  {
    variants: {
      variant: {
        default: "border-pixel-text bg-pixel-card text-pixel-text",
        hard: "border-pixel-red bg-status-hardBg/40 text-pixel-red",
        soft: "border-pixel-yellow bg-status-softBg/40 text-pixel-yellow",
        ok: "border-pixel-green bg-status-okBg/40 text-pixel-green",
        info: "border-pixel-blue bg-status-infoBg/40 text-pixel-blue",
        neutral: "border-pixel-line bg-pixel-card text-pixel-mute",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
