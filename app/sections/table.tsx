import React, { useState } from 'react';
import {
  type ColumnDef,
  type ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight, EllipsisVertical } from 'lucide-react';

import Component from '@/components/component';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnHeader } from '@/registry/components/table/column-header';
import { DataTable } from '@/registry/components/table/data-table';
import SelectableHeader from '@/registry/components/table/selectable-header';
import { SelectableRow } from '@/registry/components/table/selectable-row';

interface Entry {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const data: Array<Entry> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '0987654321',
    address: '456 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
];
const Table = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'email',
      desc: true,
    },
  ]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns: Array<ColumnDef<Entry>> = [
    {
      accessorKey: 'name',
      header: ({ table }) => <SelectableHeader table={table} />,
      cell: ({ row }) => <SelectableRow row={row} />,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title='Email'
          enableSorting
        />
      ),
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'City',
      accessorKey: 'city',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'Zip',
      accessorKey: 'zip',
    },
    {
      id: 'actions',
      header: () => null,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={'outline'}
              size='icon'>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                row.getToggleExpandedHandler()();
              }}>
              {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
              Expandable
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable<Entry>({
    state: {
      pagination,
      sorting,
      expanded,
    },
    getRowId: (row) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
  });

  return (
    <Component
      name='data-table'
      description='A data table component'
      code={`
const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'email',
      desc: true,
    },
  ]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns: Array<ColumnDef<Entry>> = [
    {
      accessorKey: 'name',
      header: ({ table }) => <SelectableHeader table={table} />,
      cell: ({ row }) => <SelectableRow row={row} />,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title='Email'
          enableSorting
        />
      ),
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'City',
      accessorKey: 'city',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'Zip',
      accessorKey: 'zip',
    },
    {
      id: 'actions',
      header: () => null,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={'outline'}
              size='icon'>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                row.getToggleExpandedHandler()();
              }}>
              {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
              Expandable
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable<Entry>({
    state: {
      pagination,
      sorting,
      expanded,
    },
    getRowId: (row) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
  });

  return (
    <DataTable
        table={table}
        expansion={() => <span>Expanded row</span>}
      />
  );
      `}>
      <DataTable
        table={table}
        expansion={() => <span>Expanded row</span>}
      />
    </Component>
  );
};

export default Table;
