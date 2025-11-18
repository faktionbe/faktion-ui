/* eslint-disable no-nested-ternary */
import * as React from 'react';
import type { Column } from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  enableSorting?: boolean;
}

export const ColumnHeader = <TData, TValue>({
  column,
  title,
  className,
  enableSorting = false,
}: ColumnHeaderProps<TData, TValue>) => {
  if (!enableSorting) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='data-[state=open]:bg-accent -ml-3 h-8'>
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ChevronDown />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(false);
            }}>
            <ArrowUp className='text-muted-foreground/70 h-3.5 w-3.5' />
            asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              column.toggleSorting(true);
            }}>
            <ArrowDown className='text-muted-foreground/70 h-3.5 w-3.5' />
            desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
