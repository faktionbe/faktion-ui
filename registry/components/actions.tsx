'use client';

import type { ComponentProps, FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type ActionsProps = ComponentProps<'div'>;

const Actions: FC<ActionsProps> = ({ className, children, ...props }) => (
  <div
    className={cn('flex items-center gap-1', className)}
    {...props}>
    {children}
  </div>
);

export type ActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
};

const Action: FC<ActionProps> = ({
  tooltip,
  children,
  label,
  className,
  variant = 'ghost',
  size = 'sm',
  ...props
}) => {
  const button = (
    <Button
      className={cn(
        'relative size-9 p-1.5 text-muted-foreground hover:text-foreground',
        className
      )}
      size={size}
      type='button'
      variant={variant}
      {...props}>
      {children}
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

interface ActionsComposition {
  Action: typeof Action;
}

const RootWithComposition: ActionsComposition & typeof Actions = Object.assign(
  Actions,
  {
    Action,
  }
);

export { RootWithComposition as Actions };
