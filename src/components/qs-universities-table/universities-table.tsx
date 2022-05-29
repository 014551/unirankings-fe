import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { University } from './model/university';
import { useTableOrdering } from '../../common/table/useTableOrdering';
import { useTablePagination } from '../../common/table/useTablePagination';
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
    label: 'Name',
  },
  {
    id: 'rank',
    numeric: true,
    label: 'Rank',
  },
  {
    id: 'country',
    numeric: false,
    label: 'Country',
  },
  {
    id: 'overallScore',
    numeric: true,
    label: 'Overall Score',
  },
  {
    id: 'internationalStudentsRatio',
    numeric: true,
    label: 'International Student Ratio',
  },
  {
    id: 'internationalFacultyRatio',
    numeric: true,
    label: 'International Faculty Ratio',
  },
  {
    id: 'facultyStudentRatio',
    numeric: true,
    label: 'Faculty Student Ratio',
  },
  {
    id: 'citationPerFaculty',
    numeric: true,
    label: 'Citation per faculty',
  },
  {
    id: 'academicReputation',
    numeric: true,
    label: 'Academic Score',
  },
  {
    id: 'employerReputation',
    numeric: true,
    label: 'Employer Score',
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
    id: 'internationalStudentsRatio',
    align: 'right',
  },
  {
    id: 'internationalFacultyRatio',
    align: 'right',
  },
  {
    id: 'facultyStudentRatio',
    align: 'right',
  },
  {
    id: 'citationPerFaculty',
    align: 'right',
  },
  {
    id: 'academicReputation',
    align: 'right',
  },
  {
    id: 'employerReputation',
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
          <TableToolbar title={'Top Universities Rankings'} />
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
