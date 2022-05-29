import * as React from 'react';
import { Order } from './useComparator';

interface Params<T> {
  initOrderBy: keyof T;
}
export const useTableOrdering = <T>({ initOrderBy }: Params<T>) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>(initOrderBy);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};
