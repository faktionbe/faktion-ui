// https://ui.shadcn.com/docs/components/radio-group

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface RadioGroupItemOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}>
    <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
      <Circle className='h-2.5 w-2.5 fill-current text-current' />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const radioGroupVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'flex gap-8',
      vertical: 'grid gap-3',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  options?: Array<RadioGroupItemOption>;
}

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, options, ...props }, ref) => {
  if (options) {
    return (
      <RadioGroupPrimitive.Root
        className={cn(
          radioGroupVariants({ orientation: props.orientation }),
          className
        )}
        {...props}
        ref={ref}>
        {options.map((option) => (
          <div
            className='flex gap-2'
            key={option.value}>
            <RadioGroupItem
              id={option.value}
              key={option.value}
              disabled={option.disabled}
              value={option.value}
              aria-label={option.label}
            />
            {option.label && (
              <label
                htmlFor={option.value}
                aria-disabled={option.disabled}
                className={labelVariants({ disabled: option.disabled })}>
                {option.label}
              </label>
            )}
          </div>
        ))}
      </RadioGroupPrimitive.Root>
    );
  }

  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-3', className)}
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
export { RadioGroup, RadioGroupItem };
