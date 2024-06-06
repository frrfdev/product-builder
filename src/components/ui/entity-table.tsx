'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Empty, EmptyProps } from './empty';
import { DataTable } from './data-table';

type Props<T> = {
  data: T[];

  columns: ColumnDef<T>[];
} & EmptyProps;

const EntityTable = <T,>({ data, buttons, columns, ...props }: Props<T>) => {
  if (data.length === 0) {
    return <Empty {...props} buttons={buttons}></Empty>;
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      newButton={buttons.newButtonOnData}
    ></DataTable>
  );
};

export default EntityTable;
