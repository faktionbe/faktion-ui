'use client';

import {
  type ElementRef,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/**
 * Copied straight from `cmdk`
 *
 * Custom filter function for whether each command menu item should matches the given search query.
 * It should return a number between 0 and 1, with 1 being the best match and 0 being hidden entirely.
 * By default, uses the `command-score` library.
 */
export type CmdkFilterHandler = (
  value: string,
  search: string,
  keywords?: Array<string>
) => number;

interface Option {
  label: string | ReactNode;
  value: string;
  keywords?: Array<string>;
}

interface GroupedOption extends Option {
  group: string;
}

export interface ComboboxProps<Grouped extends boolean> {
  value: string | undefined;
  grouped?: Grouped;
  options: Grouped extends true ? Array<GroupedOption> : Array<Option>;
  placeholder?: string;
  empty?: string;
  disabled?: boolean;
  className?: string;
  onChange: (values: string | undefined) => void;
  onFilter?: CmdkFilterHandler;
  onAddOption?: (value: string) => void;
}

const Combobox = <Grouped extends boolean>({
  value,
  grouped,
  options: _options,
  placeholder,
  empty,
  disabled,
  className,
  onChange,
  onFilter,
  onAddOption,
}: ComboboxProps<Grouped>) => {
  const inputRef = useRef<ElementRef<typeof CommandPrimitive.Input>>(null);
  const [open, setOpen] = useState(false);

  const handleFilter: CmdkFilterHandler = useCallback(
    (itemValue, search, keywords) => {
      if (typeof onFilter === 'function') {
        return onFilter(itemValue, search, keywords);
      }
      const hasKeyword = keywords?.some((keyword) =>
        keyword.includes(search.toLowerCase())
      );
      if (hasKeyword) {
        return 1;
      }
      const label = _options.find(
        (option) => option.value === itemValue
      )?.label;
      if (typeof label !== 'string') {
        return 0;
      }
      return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
    },
    [onFilter, _options]
  );

  const handleSelect = useCallback(
    (_value: string) => {
      const isSelected = value === _value;
      onChange(isSelected ? undefined : _value);
    },
    [value, onChange]
  );

  const handleAddOption = useCallback(() => {
    if (typeof onAddOption === 'function' && inputRef.current) {
      const _value = inputRef.current.value;
      if (_value) {
        onAddOption(_value);
        onChange(_value);
      }
    }
  }, [onAddOption, onChange]);

  // it thinks option.label is a promise, which it isn't. Returning it wrapped in a fragment, div, ... is undesirable
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const selected = useMemo(() => {
    const option = _options.find((_option) => _option.value === value);
    if (option) {
      return option.label;
    }
    return undefined;
  }, [value, _options]);

  const allowCustomOptions = useMemo(
    () => typeof onAddOption === 'function',
    [onAddOption]
  );

  const groups = useMemo(() => {
    if (!grouped) {
      return { '': _options };
    }
    const _groups: Record<string, Array<GroupedOption>> = {};
    for (const option of _options as Array<GroupedOption>) {
      if (Array.isArray(_groups[option.group])) {
        _groups[option.group].push(option);
      } else {
        _groups[option.group] = [option];
      }
    }
    return _groups;
  }, [grouped, _options]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(className, 'flex flex-wrap justify-start gap-1', {
            'text-muted-foreground': !selected,
          })}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}>
          {selected ?? placeholder}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command filter={handleFilter}>
          <CommandInput ref={inputRef} />
          <CommandList>
            {allowCustomOptions ? (
              <CommandEmpty className={'flex flex-col items-center p-1'}>
                <span className='text-sm'>{empty}</span>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className='m-auto'
                  onClick={handleAddOption}>
                  <Plus />
                  Add Option
                </Button>
              </CommandEmpty>
            ) : (
              <CommandEmpty>{empty}</CommandEmpty>
            )}
            {Object.entries(groups).map(([group, options]) => (
              <CommandGroup
                key={group}
                heading={group}>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={option.keywords}
                    onSelect={handleSelect}>
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
