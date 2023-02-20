import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const H1 = React.memo(({ children }: Props) => (
  <h1 className="text-xl font-bold text-typography-h1">{children}</h1>
));

export const H2 = React.memo(({ children }: Props) => (
  <h2 className="text-lg font-medium text-typography-h2">{children}</h2>
));

export const Subheading = React.memo(({ children }: Props) => (
  <span className="text-sm font-normal text-typography-h2">{children}</span>
));

export const InputLabel = React.memo(({ children }: Props) => (
  <label className="text-sm text-typography-inputlabel">{children}</label>
));

export const TableHeader = React.memo(({ children }: Props) => (
  <th className="text-sm text-typography-tablelabel">{children}</th>
));
