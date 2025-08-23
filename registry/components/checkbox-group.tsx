import { type FC, useCallback, useMemo } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';

import { Checkbox } from '@/components/ui/checkbox';

export interface CheckboxGroupItemOption {
  label?: string;
  value: string;
  disabled?: boolean;
}

const checkboxGroupVariants = cva('relative flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-2 items-center',
      vertical: 'flex-col gap-2',
    },
    reverse: {
      horizontal: 'flex-row-reverse justify-end',
      vertical: 'flex-col-reverse',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

interface CheckboxGroupProps
  extends VariantProps<typeof checkboxGroupVariants> {
  options: Array<CheckboxGroupItemOption>;
  checked: Array<string>;
  onChange: (checked: Array<string>) => void;
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

interface CheckboxGroupItemProps extends Omit<CheckboxGroupProps, 'options'> {
  option: CheckboxGroupItemOption;
}
const CheckboxGroupItem: FC<CheckboxGroupItemProps> = ({
  option,
  checked,
  onChange,
}) => {
  const isChecked = useMemo(
    () => checked.includes(option.value),
    [checked, option.value]
  );

  const handleCheckedChange = useCallback(
    (_checked: CheckedState) => {
      const values = _checked
        ? [...checked, option.value]
        : checked.filter((_option) => _option !== option.value);
      onChange(values);
    },
    [checked, onChange, option.value]
  );

  return (
    <span className='flex items-center gap-2'>
      <Checkbox
        id={option.value}
        disabled={option.disabled}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />
      {option.label && (
        <label
          htmlFor={option.value}
          className={labelVariants({ disabled: option.disabled })}>
          {option.label}
        </label>
      )}
    </span>
  );
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  checked,
  onChange,
  orientation,
}) => (
  <div className={checkboxGroupVariants({ orientation })}>
    {options.map((option) => (
      <CheckboxGroupItem
        key={option.value}
        option={option}
        checked={checked}
        onChange={onChange}
      />
    ))}
  </div>
);
export default CheckboxGroup;
