import React from 'react';

export type ShouldRenderProps = {
  children: JSX.Element | JSX.Element[];
  condition: boolean;
  fallback?: JSX.Element;
};

export const ShouldRender = ({
  children,
  condition,
  fallback,
}: ShouldRenderProps) => {
  if (condition) return <>{children}</>;

  return <>{fallback}</> ?? null;
};
