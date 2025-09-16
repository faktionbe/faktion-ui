'use client';

import type { ComponentProps, FC, HTMLAttributes } from 'react';
import { type LucideIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type ArtifactProps = HTMLAttributes<HTMLDivElement>;

const Artifact: FC<ArtifactProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm',
      className
    )}
    {...props}
  />
);

export type ArtifactHeaderProps = HTMLAttributes<HTMLDivElement>;

const ArtifactHeader: FC<ArtifactHeaderProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'flex items-center justify-between border-b bg-muted/50 px-4 py-3',
      className
    )}
    {...props}
  />
);

export type ArtifactCloseProps = ComponentProps<typeof Button>;

const ArtifactClose: FC<ArtifactCloseProps> = ({
  className,
  children,
  size = 'sm',
  variant = 'ghost',
  ...props
}) => (
  <Button
    className={cn(
      'size-8 p-0 text-muted-foreground hover:text-foreground',
      className
    )}
    size={size}
    type='button'
    variant={variant}
    {...props}>
    {children ?? <XIcon className='size-4' />}
    <span className='sr-only'>Close</span>
  </Button>
);

export type ArtifactTitleProps = HTMLAttributes<HTMLParagraphElement>;

const ArtifactTitle: FC<ArtifactTitleProps> = ({ className, ...props }) => (
  <p
    className={cn('font-medium text-foreground text-sm', className)}
    {...props}
  />
);

export type ArtifactDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const ArtifactDescription: FC<ArtifactDescriptionProps> = ({
  className,
  ...props
}) => (
  <p
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);

export type ArtifactActionsProps = HTMLAttributes<HTMLDivElement>;

const ArtifactActions: FC<ArtifactActionsProps> = ({ className, ...props }) => (
  <div
    className={cn('flex items-center gap-1', className)}
    {...props}
  />
);

export type ArtifactActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
  icon?: LucideIcon;
};

const ArtifactAction: FC<ArtifactActionProps> = ({
  tooltip,
  label,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  icon: Icon,
  children,
  className,
  size = 'sm',
  variant = 'ghost',
  ...props
}) => {
  const button = (
    <Button
      className={cn(
        'size-8 p-0 text-muted-foreground hover:text-foreground',
        className
      )}
      size={size}
      type='button'
      variant={variant}
      {...props}>
      {Icon ? <Icon className='size-4' /> : children}
      <span className='sr-only'>{label ?? tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export type ArtifactContentProps = HTMLAttributes<HTMLDivElement>;

const ArtifactContent: FC<ArtifactContentProps> = ({ className, ...props }) => (
  <div
    className={cn('flex-1 overflow-auto p-4', className)}
    {...props}
  />
);

interface ArtifactComposition {
  Header: typeof ArtifactHeader;
  Close: typeof ArtifactClose;
  Title: typeof ArtifactTitle;
  Description: typeof ArtifactDescription;
  Actions: typeof ArtifactActions;
  Action: typeof ArtifactAction;
  Content: typeof ArtifactContent;
}

const RootWithComposition: ArtifactComposition & typeof Artifact =
  Object.assign(Artifact, {
    Header: ArtifactHeader,
    Close: ArtifactClose,
    Title: ArtifactTitle,
    Description: ArtifactDescription,
    Actions: ArtifactActions,
    Action: ArtifactAction,
    Content: ArtifactContent,
  });

export { RootWithComposition as Artifact };
