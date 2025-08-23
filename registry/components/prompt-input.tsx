import type {
  ComponentProps,
  FC,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react";
import { Children } from "react";
import type { ChatStatus } from "ai";
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type PromptInputProps = HTMLAttributes<HTMLFormElement>;

const PromptInput: FC<PromptInputProps> = ({ className, ...props }) => (
  <form
    className={cn(
      "w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm",
      className
    )}
    {...props}
  />
);

export type PromptInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};
const PromptInputTextarea: FC<PromptInputTextareaProps> = ({
  onChange,
  className,
  placeholder = "What would you like to know?",
  ...props
}) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === "Enter") {
      // Don't submit if IME composition is in progress
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (event.shiftKey) {
        // Allow newline
        return;
      }

      // Submit on Enter (without Shift)
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Textarea
      className={cn(
        "w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0",
        "field-sizing-content max-h-[6lh] bg-transparent dark:bg-transparent",
        "focus-visible:ring-0",
        className
      )}
      name="message"
      onChange={(event) => {
        onChange?.(event);
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  );
};

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement>;
const PromptInputToolbar: FC<PromptInputToolbarProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex items-center justify-between p-1", className)}
    {...props}
  />
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;
const PromptInputTools: FC<PromptInputToolsProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex items-center gap-1",
      "[&_button:first-child]:rounded-bl-xl",
      className
    )}
    {...props}
  />
);

export type PromptInputButtonProps = ComponentProps<typeof Button>;

const PromptInputButton: FC<PromptInputButtonProps> = ({
  variant = "ghost",
  className,
  size,
  ...props
}) => {
  const newSize =
    size ?? Children.count(props.children) > 1 ? "default" : "icon";

  return (
    <Button
      className={cn(
        "shrink-0 gap-1.5 rounded-lg",
        variant === "ghost" && "text-muted-foreground",
        newSize === "default" && "px-3",
        className
      )}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );
};

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus;
};

const PromptInputSubmit: FC<PromptInputSubmitProps> = ({
  className,
  variant = "default",
  size = "icon",
  status,
  children,
  ...props
}) => {
  let Icon = <SendIcon className="size-4" />;

  if (status === "submitted") {
    Icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />;
  }

  return (
    <Button
      className={cn("gap-1.5 rounded-lg", className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};

export type PromptInputModelSelectProps = ComponentProps<typeof Select>;

const PromptInputModelSelect: FC<PromptInputModelSelectProps> = (props) => (
  <Select {...props} />
);

export type PromptInputModelSelectTriggerProps = ComponentProps<
  typeof SelectTrigger
>;

const PromptInputModelSelectTrigger: FC<PromptInputModelSelectTriggerProps> = ({
  className,
  ...props
}) => (
  <SelectTrigger
    className={cn(
      "border-none bg-transparent font-medium text-muted-foreground shadow-none transition-colors",
      'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
      className
    )}
    {...props}
  />
);

export type PromptInputModelSelectContentProps = ComponentProps<
  typeof SelectContent
>;

const PromptInputModelSelectContent: FC<PromptInputModelSelectContentProps> = ({
  className,
  ...props
}) => <SelectContent className={cn(className)} {...props} />;

export type PromptInputModelSelectItemProps = ComponentProps<typeof SelectItem>;

const PromptInputModelSelectItem: FC<PromptInputModelSelectItemProps> = ({
  className,
  ...props
}) => <SelectItem className={cn(className)} {...props} />;

export type PromptInputModelSelectValueProps = ComponentProps<
  typeof SelectValue
>;

const PromptInputModelSelectValue: FC<PromptInputModelSelectValueProps> = ({
  className,
  ...props
}) => <SelectValue className={cn(className)} {...props} />;

interface PromptInputComposition {
  Textarea: typeof PromptInputTextarea;
  Toolbar: typeof PromptInputToolbar;
  Tools: typeof PromptInputTools;
  Button: typeof PromptInputButton;
  Submit: typeof PromptInputSubmit;
  ModelSelect: typeof PromptInputModelSelect;
  ModelSelectTrigger: typeof PromptInputModelSelectTrigger;
  ModelSelectContent: typeof PromptInputModelSelectContent;
  ModelSelectItem: typeof PromptInputModelSelectItem;
  ModelSelectValue: typeof PromptInputModelSelectValue;
}

const RootWithComposition: PromptInputComposition & typeof PromptInput =
  Object.assign(PromptInput, {
    Textarea: PromptInputTextarea,
    Toolbar: PromptInputToolbar,
    Tools: PromptInputTools,
    Button: PromptInputButton,
    Submit: PromptInputSubmit,
    ModelSelect: PromptInputModelSelect,
    ModelSelectTrigger: PromptInputModelSelectTrigger,
    ModelSelectContent: PromptInputModelSelectContent,
    ModelSelectItem: PromptInputModelSelectItem,
    ModelSelectValue: PromptInputModelSelectValue,
  });

export { RootWithComposition as PromptInput };
