import { Job } from './model/job';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { useTableOrdering } from '../../common/table/useTableOrdering';
import { useComparator } from '../../common/table/useComparator';
import { useTablePagination } from '../../common/table/useTablePagination';
import { TableToolbar } from '../../common/table/table-toolbar';
import { EnhancedTableHead, HeadCell } from '../../common/table/table-head';

const headCells: readonly HeadCell<Job>[] = [
  {
    id: 'rankingIdentifier',
    numeric: false,
    label: 'Ranking Provider',
  },
  {
    id: 'rankingYear',
    numeric: false,
    label: 'Year',
  },
  {
    id: 'processingDate',
    numeric: false,
    label: 'Processing date',
  },
  {
    id: 'result',
    numeric: false,
    label: 'Execution result',
  },
];

interface JobsTableProps {
  jobs: Job[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
  const { order, orderBy, handleRequestSort } = useTableOrdering<Job>({
    initOrderBy: 'processingDate',
  });

  const comparator = useComparator(order, orderBy);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useTablePagination();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobs.length) : 0;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar title={'Jobs history'} />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {jobs
                .slice()
                .sort(comparator)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.rankingIdentifier}
                      </TableCell>
                      <TableCell align="left">{row.rankingYear}</TableCell>
                      <TableCell align="left">
                        {moment(row.processingDate).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell align="left">{row.result}</TableCell>
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
