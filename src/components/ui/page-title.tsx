import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const PageTitle = ({ children }: Props) => {
  return <div className="font-bold text-2xl text-frx-red-900">{children}</div>;
};
