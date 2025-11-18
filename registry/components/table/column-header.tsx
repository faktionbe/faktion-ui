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
      <Button
        variant='ghost'
        size='sm'
        className='-ml-3 h-8'
        onClick={() => {
          column.toggleSorting();
        }}>
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ChevronDown />
        ) : column.getIsSorted() === 'asc' ? (
          <ChevronUp />
        ) : (
          <ChevronsUpDown />
        )}
      </Button>
    </div>
  );
};
