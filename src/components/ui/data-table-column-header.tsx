import { Column } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import {
  ArrowDownIcon,
  ArrowDownZaIcon,
  ArrowUpIcon,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: React.ReactNode;
  canConfigureColumns?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  canConfigureColumns,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-frx-red-900 data-[state=open]:text-white"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownZaIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanFilter() && (
            <div className="flex flex-col">
              <Input
                placeholder="Filtre aqui..."
                className="h-10"
                onChange={(e) => {
                  const value = e.target.value;
                  column.setFilterValue(value);
                }}
              ></Input>
            </div>
          )}
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {canConfigureColumns ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Esconder
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
