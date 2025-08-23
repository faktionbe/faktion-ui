import { forwardRef, type MouseEventHandler, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fabVariants = cva(
  "flex cursor-pointer flex-col min-h-fit text-wrap truncate items-center justify-center gap-2 whitespace-nowrap rounded-full text-md font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-14 h-14",
      },
      position: {
        default: "static",
        "corner-left": "fixed bottom-2 left-2",
        "corner-right": "fixed bottom-2 right-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "default",
    },
  }
);

interface FabProps extends VariantProps<typeof fabVariants> {
  children: ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const Fab = forwardRef<HTMLButtonElement, FabProps>(
  ({ children, className, onClick, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={cn(fabVariants(props), className)}
    >
      {children}
    </button>
  )
);
Fab.displayName = "Fab";

export default Fab;
