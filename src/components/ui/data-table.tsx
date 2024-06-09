'use client';
import * as React from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Column,
} from '@tanstack/react-table';
import { Input } from './input';
import { DataTableViewOptions } from './data-table-view-options';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { cn } from '@/lib/utils';
import { DataTablePagination } from './data-table-pagination';
import { ScrollArea } from './scroll-area';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  newButton?: React.ReactNode;
  canConfigureColumns?: boolean;
}

const DEFAULT_REACT_TABLE_COLUMN_WIDHT = 150;

export function DataTable<TData, TValue>({
  columns,
  data,
  newButton,
  canConfigureColumns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
    const isPinned =
      column.getIsPinned() || (column.id === 'actions' ? 'right' : '');
    if (!isPinned) return {};
    const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left');
    const isFirstRightPinnedColumn =
      (isPinned === 'right' && column.getIsFirstColumn('right')) ||
      column.id === 'actions';

    const styles: any = {};

    return {
      ...styles,
      boxShadow: isLastLeftPinnedColumn
        ? '-4px 0 4px -4px rgba(255,255,255,0.1) inset'
        : isFirstRightPinnedColumn
        ? '4px 0 4px -4px rgba(255,255,255,0.1) inset'
        : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    };
  };

  return (
    <div className="h-full grid auto-rows-max">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrar..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-1">
          {newButton && newButton}
          {canConfigureColumns ? <DataTableViewOptions table={table} /> : null}
        </div>
      </div>
      <ScrollArea className=" rounded-md shrink dark:bg-frx-blue-900">
        <Table>
          <TableHeader className="hover:bg-frx-blue-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const customClass =
                    header.column.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDHT
                      ? cn(`w-[${header.column.getSize()}px]`)
                      : '';

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        customClass,
                        header.column.getIsPinned() ||
                          (header.column.id === 'actions' ? 'right' : '')
                          ? 'bg-frx-blue-900'
                          : '',
                        'shadow-md border-0'
                      )}
                      data-action={!!customClass}
                      style={{ ...getCommonPinningStyles(header.column) }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-frx-blue-800 even:bg-frx-blue-900 odd:bg-frx-blue-850/30 border-0"
                >
                  {row.getVisibleCells().map((cell) => {
                    const customClass =
                      cell.column.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDHT
                        ? cn(`w-[${cell.column.getSize()}px]`)
                        : '';

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          customClass,
                          cell.column.getIsPinned() ||
                            (cell.column.id === 'actions' ? 'right' : '')
                            ? 'bg-frx-blue-900'
                            : ''
                        )}
                        data-action={!!customClass}
                        style={{ ...getCommonPinningStyles(cell.column) }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <DataTablePagination table={table} />
        </div>
      </ScrollArea>
    </div>
  );
}
