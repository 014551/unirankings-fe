import { YearsSelect } from './years-select';
import { SelectChangeEvent } from '@mui/material';
import authHeader from '../../services/auth-header';
import useAxios from 'axios-hooks';

interface YearsSelectContainerProps {
  url: string;
  selectedYear: string;
  changeYear: (newYear: string) => void;
}

export const YearsSelectContainer = ({
  url,
  selectedYear,
  changeYear,
}: YearsSelectContainerProps) => {
  const [{ data: years, loading, error }] = useAxios(
    {
      url,
      headers: authHeader(),
    },
    {
      useCache: false,
    }
  );

  const changeSelectedYear = (e: SelectChangeEvent) => {
    changeYear(e.target.value as string);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <YearsSelect
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={changeSelectedYear}
      />
    );
  }
};
