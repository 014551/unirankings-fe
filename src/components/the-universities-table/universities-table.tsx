import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { University } from './model/university';
import { useTablePagination } from '../../common/table/useTablePagination';
import { useTableOrdering } from '../../common/table/useTableOrdering';
import { useComparator } from '../../common/table/useComparator';
import {
  EnhancedTableBody,
  EnhancedTableCell,
} from '../../common/table/table-body';
import { EnhancedTableHead, HeadCell } from '../../common/table/table-head';
import { TableToolbar } from '../../common/table/table-toolbar';
import { AxiosError } from 'axios';

const headCells: readonly HeadCell<University>[] = [
  {
    id: 'name',
    numeric: false,
    minWidth: 200,
    label: 'Name',
  },
  {
    id: 'rank',
    numeric: true,
    minWidth: 100,
    label: 'Rank',
  },
  {
    id: 'country',
    numeric: false,
    label: 'Country',
    minWidth: 200,
  },
  {
    id: 'overallScore',
    numeric: true,
    label: 'Overall Score',
    minWidth: 100,
  },
  {
    id: 'teachingScore',
    numeric: true,
    label: 'Teaching Score',
    minWidth: 100,
  },
  {
    id: 'researchScore',
    numeric: true,
    label: 'Research Score',
    minWidth: 100,
  },
  {
    id: 'citationsScore',
    numeric: true,
    label: 'Citations Score',
    minWidth: 100,
  },
  {
    id: 'industryIncomeScore',
    numeric: true,
    label: 'Industry Income Score',
    minWidth: 100,
  },
  {
    id: 'internationalOutlookScore',
    numeric: true,
    label: 'International Outlook Score',
    minWidth: 100,
  },
];

const tableCells: EnhancedTableCell<University>[] = [
  {
    id: 'name',
    align: 'left',
  },
  {
    id: 'rank',
    align: 'right',
  },
  {
    id: 'country',
    align: 'left',
  },
  {
    id: 'overallScore',
    align: 'right',
  },
  {
    id: 'teachingScore',
    align: 'right',
  },
  {
    id: 'researchScore',
    align: 'right',
  },
  {
    id: 'citationsScore',
    align: 'right',
  },
  {
    id: 'industryIncomeScore',
    align: 'right',
  },
  {
    id: 'internationalOutlookScore',
    align: 'right',
  },
];

interface EnhancedTableProps {
  rows: University[];
  error?: AxiosError | null;
  isLoading: boolean;
}

export default function UniversitiesTable(props: EnhancedTableProps) {
  const { rows, error, isLoading } = props;

  const { order, orderBy, handleRequestSort } = useTableOrdering<University>({
    initOrderBy: 'originalOrderIdx',
  });

  const comparator = useComparator(order, orderBy);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useTablePagination();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableToolbar title={'Times Higher Education University Rankings'} />
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
              <EnhancedTableBody
                tableCells={tableCells}
                rows={rows}
                comparator={comparator}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }
}
