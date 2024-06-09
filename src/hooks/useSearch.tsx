import React, { useEffect } from 'react';

type Props<T> = {
  list: T[];
  keys: (keyof T)[];
};

export const useSearch = <T,>({ list, keys }: Props<T>) => {
  const [search, setSearch] = React.useState('');

  const filteredList = list.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  });

  return { setSearch, search, filteredList };
};
