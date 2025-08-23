import type { ComponentProps, FC } from "react";
import { ChevronDownIcon, SearchIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export type TaskItemFileProps = ComponentProps<"div">;

const TaskItemFile: FC<TaskItemFileProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      "inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5 text-foreground text-xs",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type TaskItemProps = ComponentProps<"div">;

const TaskItem: FC<TaskItemProps> = ({ children, className, ...props }) => (
  <div className={cn("text-muted-foreground text-sm", className)} {...props}>
    {children}
  </div>
);

export type TaskProps = ComponentProps<typeof Collapsible>;

const Task: FC<TaskProps> = ({ defaultOpen = true, className, ...props }) => (
  <Collapsible
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    )}
    defaultOpen={defaultOpen}
    {...props}
  />
);

export type TaskTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  title: string;
};

const TaskTrigger: FC<TaskTriggerProps> = ({
  children,
  className,
  title,
  ...props
}) => (
  <CollapsibleTrigger asChild className={cn("group", className)} {...props}>
    {children ?? (
      <div className="flex cursor-pointer items-center gap-2 text-muted-foreground hover:text-foreground">
        <SearchIcon className="size-4" />
        <p className="text-sm">{title}</p>
        <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
      </div>
    )}
  </CollapsibleTrigger>
);

export type TaskContentProps = ComponentProps<typeof CollapsibleContent>;

const TaskContent: FC<TaskContentProps> = ({
  children,
  className,
  ...props
}) => (
  <CollapsibleContent
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    )}
    {...props}
  >
    <div className="mt-4 space-y-2 border-muted border-l-2 pl-4">
      {children}
    </div>
  </CollapsibleContent>
);

interface TaskComposition {
  ItemFile: typeof TaskItemFile;
  Item: typeof TaskItem;
  Trigger: typeof TaskTrigger;
  Content: typeof TaskContent;
}

const RootWithComposition: TaskComposition & typeof Task = Object.assign(Task, {
  ItemFile: TaskItemFile,
  Item: TaskItem,
  Trigger: TaskTrigger,
  Content: TaskContent,
});

export { RootWithComposition as Task };
