import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-none border-2 border-pixel-line bg-pixel-bg px-4 py-3 text-sm text-pixel-text transition-none placeholder:text-pixel-mute focus-visible:outline-none focus-visible:ring-0 focus-visible:border-pixel-yellow disabled:cursor-not-allowed disabled:opacity-50 resize-y font-mono",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
