import { type FC, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { useComposition } from '@/hooks/use-composition';
import { cn } from '@/lib/utils';

const notificationContentVariants = cva(
  'absolute z-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/80',
  {
    variants: {
      side: {
        'top-right': '-right-1/2 -translate-x-1/2 -top-1/2 translate-y-1/2',
        'top-left': '-left-1/2 translate-x-1/2 -top-1/2 translate-y-1/2',
        'bottom-right':
          '-right-1/2 -translate-x-1/2 -bottom-1/2 -translate-y-1/2',
        'bottom-left': '-left-1/2 translate-x-1/2 -bottom-1/2 -translate-y-1/2',
      },
      size: {
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
      },
      variant: {
        default: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      side: 'top-right',
      size: 'md',
      variant: 'default',
    },
  }
);
export interface NotificationContentProps
  extends VariantProps<typeof notificationContentVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
const NotificationContent: FC<NotificationContentProps> = ({
  children,
  className,
  onClick,
  ...props
}) => (
  <button
    type='button'
    className={cn(notificationContentVariants(props), className)}
    onClick={onClick}>
    {children}
  </button>
);
NotificationContent.displayName = 'NotificationContent';

const notificationVariants = cva('relative w-fit h-fit');
interface NotificationProps extends VariantProps<typeof notificationVariants> {
  children: ReactNode;
  className?: string;
}
interface NotificationComposition {
  Content: typeof NotificationContent;
}
const Root: FC<NotificationProps> = ({ children: _children, className }) => {
  const [children, content] = useComposition(
    _children,
    NotificationContent.displayName
  );

  return (
    <div className={cn(notificationVariants(), className)}>
      {children}
      {content}
    </div>
  );
};
Root.displayName = 'Notification';

const RootWithComposition: typeof Root & NotificationComposition =
  Object.assign(Root, {
    Content: NotificationContent,
  });

export { RootWithComposition as Notification };
