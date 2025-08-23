import type { ComponentProps, FC } from "react";
import { useCallback } from "react";
import { ArrowDownIcon } from "lucide-react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ConversationProps = ComponentProps<typeof StickToBottom>;

const Conversation: FC<ConversationProps> = ({ className, ...props }) => (
  <StickToBottom
    className={cn("relative flex-1 overflow-y-auto", className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

const ConversationContent: FC<ConversationContentProps> = ({
  className,
  ...props
}) => <StickToBottom.Content className={cn("p-4", className)} {...props} />;

export type ConversationScrollButtonProps = ComponentProps<typeof Button>;

const ConversationScrollButton: FC<ConversationScrollButtonProps> = ({
  className,
  ...props
}) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(async () => {
    await scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          "absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full",
          className
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
};

interface ConversationComposition {
  Content: typeof ConversationContent;
  ScrollButton: typeof ConversationScrollButton;
}

const RootWithComposition: ConversationComposition & typeof Conversation =
  Object.assign(Conversation, {
    Content: ConversationContent,
    ScrollButton: ConversationScrollButton,
  });

export { RootWithComposition as Conversation };
