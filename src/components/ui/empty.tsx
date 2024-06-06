import { cn } from '@/lib/utils';
import React from 'react';

export type EmptyProps = {
  emptyMessage?: string;
  emptyDescription?: string;
  buttons: {
    newButtonOnEmpty?: React.ReactNode;
    newButtonOnData: React.ReactNode;
  };
  newButton?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

export const Empty = ({
  emptyMessage = 'Nada para mostrar',
  emptyDescription = 'Pode criar um novo item clicando no botão "Adicionar".',
  buttons,
  size = 'lg',
}: EmptyProps) => {
  return (
    <div className="flex h-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm dark:border-frx-blue-800">
      <div className="flex flex-col items-start gap-1">
        <div className="flex p-4 flex-col items-center gap-1 text-center ">
          <h3
            className={cn(
              'text-2xl font-bold tracking-tight',
              size === 'sm' ? 'text-sm' : ''
            )}
          >
            {emptyMessage}
          </h3>
          <p className="text-sm text-muted-foreground">{emptyDescription}</p>

          {buttons.newButtonOnEmpty && buttons.newButtonOnEmpty}
        </div>
      </div>
    </div>
  );
};
