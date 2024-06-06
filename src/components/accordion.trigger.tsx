'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button, FlatButton } from './ui/button';
import { CategoryModal } from '../app/category/components/category.modal';

type AccordionTriggerProps = {
  isDisabled?: boolean;
  title?: React.ReactNode;
};

export const AccordionHead = ({ title }: AccordionTriggerProps) => {
  return (
    <div className="flex flex-col w-full h-auto">
      <section
        className={cn(
          'relative flex px-4 py-[12px] w-full justify-between dark:drop-shadow-lg'
        )}
      >
        <div className="relative flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col">
              <h2 className="text-base font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
