import { type FC, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusVariants = cva("", {
  variants: {
    status: {
      online: "text-green-500 bg-green-500",
      offline: "text-red-500 bg-red-500",
    },
  },
  defaultVariants: {
    status: "online",
  },
});

const sizeVariants = cva("", {
  variants: {
    size: {
      sm: "size-2",
      md: "size-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const textVariants = cva("text-muted-foreground flex items-center", {
  variants: {
    size: {
      sm: "gap-1 text-xs",
      md: "gap-2 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface StatusProps
  extends VariantProps<typeof statusVariants>,
    VariantProps<typeof sizeVariants> {
  children?: ReactNode;
  className?: string;
}
const Status: FC<StatusProps> = ({ status, size, children, className }) => (
  <div className={cn(textVariants({ size }), className)}>
    {children}
    <span className="relative flex">
      <span
        className={cn(
          "rounded-full",
          statusVariants({ status }),
          sizeVariants({ size })
        )}
      ></span>
      <span
        className={cn(
          "absolute inline-flex animate-ping rounded-full opacity-75 duration-[2000ms]",
          statusVariants({ status }),
          sizeVariants({ size })
        )}
      ></span>
    </span>
  </div>
);

export default Status;
