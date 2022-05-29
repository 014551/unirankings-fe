import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

interface Params<T> {
  tableCells: EnhancedTableCell<T>[];
  rows: T[];
  comparator: (a: T, b: T) => number;
  page: number;
  rowsPerPage: number;
}

export interface EnhancedTableCell<T> {
  id: keyof T;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}

export const EnhancedTableBody = <T,>({
  tableCells,
  rows,
  comparator,
  page,
  rowsPerPage,
}: Params<T>) => {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableBody>
      {rows
        .slice()
        .sort(comparator)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow hover tabIndex={-1} key={labelId}>
              {tableCells.map((tableCell, idx) => {
                return idx === 0 ? (
                  <TableCell component="th" id={labelId} scope="row">
                    {row[tableCell.id]}
                  </TableCell>
                ) : (
                  <TableCell align={tableCell.align}>
                    {row[tableCell.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
