import type { ComponentProps, FC } from 'react';
import { BookIcon, ChevronDownIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export type SourcesProps = ComponentProps<'div'>;

const Sources: FC<SourcesProps> = ({ className, ...props }) => (
  <Collapsible
    className={cn('not-prose mb-4 text-primary text-xs', className)}
    {...props}
  />
);

export type SourcesTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  count: number;
};

const SourcesTrigger: FC<SourcesTriggerProps> = ({
  className,
  count,
  children,
  ...props
}) => (
  <CollapsibleTrigger
    className='flex items-center gap-2'
    {...props}>
    {children ?? (
      <>
        <p className='font-medium'>Used {count} sources</p>
        <ChevronDownIcon className='h-4 w-4' />
      </>
    )}
  </CollapsibleTrigger>
);

export type SourcesContentProps = ComponentProps<typeof CollapsibleContent>;

const SourcesContent: FC<SourcesContentProps> = ({ className, ...props }) => (
  <CollapsibleContent
    className={cn(
      'mt-3 flex w-fit flex-col gap-2',
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      className
    )}
    {...props}
  />
);

export type SourceProps = ComponentProps<'a'>;

const Source: FC<SourceProps> = ({ href, title, children, ...props }) => (
  <a
    className='flex items-center gap-2'
    href={href}
    rel='noreferrer'
    target='_blank'
    {...props}>
    {children ?? (
      <>
        <BookIcon className='h-4 w-4' />
        <span className='block font-medium'>{title}</span>
      </>
    )}
  </a>
);

interface SourcesComposition {
  Trigger: typeof SourcesTrigger;
  Content: typeof SourcesContent;
  Source: typeof Source;
}

const RootWithComposition: SourcesComposition & typeof Sources = Object.assign(
  Sources,
  {
    Trigger: SourcesTrigger,
    Content: SourcesContent,
    Source,
  }
);

export { RootWithComposition as Sources };
