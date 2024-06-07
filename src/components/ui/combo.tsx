import * as React from 'react';
import { Control } from 'react-hook-form';

import type * as Select from '@radix-ui/react-select';
import { useDebounce, useIntersectionObserver } from '@uidotdev/usehooks';
import { Check, ChevronsUpDown, LoaderCircle, X } from 'lucide-react';

import { buttonVariants } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

export type SelectChangeNativeEvent = {
  target: {
    value: string;
    name: string;
  };
};

export type OptionData<T = any> = (
  | {
      value: string;
      label: React.ReactNode;
      disabled?: boolean;
      readable: string;
      key?: string;
      [other: string]: unknown;
    }
  | {
      value: string;
      label: string | React.ReactNode;
      disabled?: boolean;
      readable?: string;
      key?: string;
      [other: string]: unknown;
    }
) & { data: T };

export type ComboBoxItem = {
  label: string;
  value: string;
};

export type ComboBoxProps<T> = Omit<Select.SelectProps, 'onValueChange'> & {
  placeholder?: string;
  searchPlaceholder?: string;
  options: T[];
  initialOptions?: T[];
  onValueChange?: (
    value: string,
    option: ComboBoxProps<T>['options'][number]
  ) => void;
  onChange?: (value: SelectChangeNativeEvent) => void;
  emptyMessage?: string;
  variant?: 'normal' | 'outlined';
  isLoading?: boolean;
  control?: Control<any, any>;
  disabledOptions?: string[];
  className?: string;
  showClearButton?: boolean;
  onSearch?: (value: string) => void;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
};

const Combo = <T extends OptionData>(
  {
    options = [],
    placeholder,
    onValueChange,
    onChange,
    disabledOptions,
    value = '',
    searchPlaceholder,
    emptyMessage,
    name,
    className,
    disabled,
    isLoading,
    showClearButton = true,
    onSearch,
    onLoadMore,
    showLoadMore = false,
    initialOptions = [],
    ..._
  }: ComboBoxProps<T>,
  ref: React.Ref<HTMLInputElement> | null
) => {
  const [loadMoreRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState<T[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [isTyping, setIsTyping] = React.useState(false);

  const search = useDebounce(searchText, 300);

  const selectedOption = internalValue
    ? options.find((option) => option.value === internalValue)
    : null;

  const handleFilter = (value: string) => {
    setIsTyping(true);
    setSearchText(value);
    setFilteredOptions(
      options
        .map((option) => ({
          ...option,
          readable:
            typeof option.label !== 'string'
              ? option.readable ?? ''
              : option.label.toString(),
        }))
        .filter(
          (option) =>
            option.readable
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(
                value
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
              ) &&
            !initialOptions.find(
              (initialOption) => initialOption.value === option.value
            )
        )
    );
  };

  const resetValue = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setInternalValue('');
    onValueChange?.('', {} as T);
    onChange?.({
      target: {
        value: '',
        name: name ?? '',
      },
    });
  };

  React.useEffect(() => {
    setInternalValue(value || '');
    onChange?.({
      target: {
        value: value,
        name: name ?? '',
      },
    });
  }, [value]);

  React.useEffect(() => {
    onSearch?.(search);
    setIsTyping(false);
  }, [search]);

  React.useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      onLoadMore?.();
    }
  }, [entry?.isIntersecting]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input
        name={name}
        value={value}
        onChange={() => null}
        className="w-0 h-0 absolute"
        tabIndex={-1}
        ref={ref as any}
      />
      <PopoverTrigger
        asChild
        disabled={disabled}
        className="relative group/combo"
      >
        <div
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'w-[200px] h-10 py-2 justify-between overflow-hidden overflow-ellipsis whitespace-nowrap ',
            (!placeholder && !selectedOption) ?? 'justify-end',
            className,
            disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
          )}
          aria-expanded={open}
          title={
            (selectedOption &&
              (typeof selectedOption.label === 'string'
                ? selectedOption.label
                : selectedOption.readable)) ||
            ''
          }
        >
          <span
            className={cn(
              'text-gray-500 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap',
              placeholder && !selectedOption ? 'text-gray-400' : ''
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {isLoading ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : value && showClearButton ? (
            <button
              onClick={resetValue}
              type="button"
              aria-label="clear"
              className="focus:text-red-600 opacity-50 focus:opacity-100"
              title="Limpar"
            >
              <X className="ml-2 h-4 w-4 shrink-0" />
            </button>
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={handleFilter}
            value={searchText}
          />
          <CommandEmpty>
            {emptyMessage ||
              (isLoading || isTyping ? `Carregando...` : 'Nada para mostrar')}
          </CommandEmpty>
          <CommandGroup className="max-h-[90px] flex flex-col w-full overflow-y-auto">
            <CommandList className="w-full h-full max-h-full">
              {[
                initialOptions.find((option) => option.value === value),
                ...filteredOptions,
              ]
                .filter((option) => !!option)
                .map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setInternalValue(
                        currentValue === value ? '' : currentValue
                      );
                      onChange?.({
                        target: {
                          value: currentValue === value ? '' : currentValue,
                          name: name ?? '',
                        },
                      });
                      onValueChange?.(
                        currentValue === value ? '' : currentValue,
                        option
                      );

                      setOpen(false);
                    }}
                    className={cn(
                      'dark:hover:bg-frx-blue-800 dark:aria-selected:bg-frx-blue-800 ',
                      option.value === value
                        ? 'dark:aria-selected:bg-frx-blue-800 '
                        : ''
                    )}
                    disabled={disabledOptions?.includes(option.value)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
            </CommandList>
            {showLoadMore && !isTyping ? <div ref={loadMoreRef} /> : null}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const ComboBox = React.forwardRef(Combo);
