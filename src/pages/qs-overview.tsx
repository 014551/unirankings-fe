import { Button, Grid } from '@mui/material';
import { CSVLink } from 'react-csv';
import * as React from 'react';
import { useState } from 'react';
import UniversitiesTableContainer from '../components/qs-universities-table/universities-table-container';
import NavbarContainer from '../components/navbar/navbar-container';
import { YearsSelectContainer } from '../components/years-select/years-select-container';
import useAxios from 'axios-hooks';
import authHeader from '../services/auth-header';
import {
  BeUniversity,
  University,
} from '../components/qs-universities-table/model/university';
import { mapBeUniversities } from '../components/qs-universities-table/use-universities-api';
import { API_URL } from '../model/constants';

const QS_API_URL = `${API_URL}/qs`;
const QS_RANKS_YEARS_API_URL = `${QS_API_URL}/ranks/years`;
const QS_UNIVERSITIES_API_URL = `${QS_API_URL}/universities?year=`;

export default function QsOverview() {
  const [selectedYear, setSelectedYear] = useState('');
  const [url, setUrl] = useState(`${QS_UNIVERSITIES_API_URL}${selectedYear}`);

  const changeYear = (newYear: string) => {
    setSelectedYear(newYear);
    setUrl(`${QS_UNIVERSITIES_API_URL}${newYear}`);
  };

  const [{ data: beUniversities = [], loading, error }] = useAxios<
    BeUniversity[]
  >({
    url,
    headers: authHeader(),
  });

  const [universities, setUniversities] = useState<University[]>([]);
  React.useEffect(() => {
    setUniversities(mapBeUniversities(beUniversities));
  }, [beUniversities]);

  return (
    <>
      <NavbarContainer />
      <Grid container spacing={2}>
        <Grid container item xs={12} md={2} mt={2}>
          <Grid container direction={'column'}>
            <Grid container spacing={2} direction={'column'} item xs={4}>
              <Grid item xs={2}>
                <YearsSelectContainer
                  url={QS_RANKS_YEARS_API_URL}
                  selectedYear={selectedYear}
                  changeYear={changeYear}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant={'outlined'}>
                  <CSVLink filename={`QS_${selectedYear}`} data={universities}>
                    Download
                  </CSVLink>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={8} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={10}>
          <UniversitiesTableContainer
            universities={universities}
            error={error}
            isLoading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}
