"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-bold uppercase tracking-wider transition-none border-2 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-pixel-green border-pixel-green text-pixel-bg hover:bg-pixel-yellow hover:border-pixel-yellow hover:text-pixel-bg",
        secondary:
          "bg-pixel-card border-pixel-line text-pixel-text hover:border-pixel-yellow hover:text-pixel-yellow",
        ghost:
          "bg-transparent border-transparent text-pixel-mute hover:text-pixel-yellow hover:border-pixel-yellow",
        soft:
          "bg-pixel-yellow/10 border-pixel-yellow/40 text-pixel-yellow hover:bg-pixel-yellow/20 hover:border-pixel-yellow",
        outline:
          "bg-transparent border-pixel-yellow text-pixel-yellow hover:bg-pixel-yellow/10",
        danger:
          "bg-pixel-red border-pixel-red text-pixel-text hover:bg-pixel-yellow hover:border-pixel-yellow hover:text-pixel-bg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-[11px]",
        lg: "h-12 px-6 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
