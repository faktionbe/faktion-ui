import type { ComponentProps, FC, HTMLAttributes } from 'react';
import type { UIMessage } from 'ai';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full items-end justify-end gap-2 py-4',
      from === 'user' ? 'is-user' : 'is-assistant flex-row-reverse justify-end',
      '[&>div]:max-w-[80%]',
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

const MessageContent: FC<MessageContentProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm',
      'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
      'group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground',
      className
    )}
    {...props}>
    <div className='is-user:dark'>{children}</div>
  </div>
);

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

const MessageAvatar: FC<MessageAvatarProps> = ({
  src,
  name,
  className,
  ...props
}) => (
  <Avatar
    className={cn('size-8 ring-1 ring-border', className)}
    {...props}>
    <AvatarImage
      alt=''
      className='mt-0 mb-0'
      src={src}
    />
    <AvatarFallback>{name?.slice(0, 2) ?? 'ME'}</AvatarFallback>
  </Avatar>
);

interface MessageComposition {
  Content: typeof MessageContent;
  Avatar: typeof MessageAvatar;
}

const RootWithComposition: MessageComposition & typeof Message = Object.assign(
  Message,
  {
    Content: MessageContent,
    Avatar: MessageAvatar,
  }
);

export { RootWithComposition as Message };
