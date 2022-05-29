import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { mapBeUniversities } from '../components/the-universities-table/map-universities';
import { YearsSelectContainer } from '../components/years-select/years-select-container';
import UniversitiesTableContainer from '../components/the-universities-table/universities-table-container';
import NavbarContainer from '../components/navbar/navbar-container';
import authHeader from '../services/auth-header';
import useAxios from 'axios-hooks';
import {
  BeUniversity,
  University,
} from '../components/the-universities-table/model/university';
import { API_URL } from '../model/constants';

const THE_API_URL = `${API_URL}/the`;
const THE_RANKS_YEARS_API_URL = `${API_URL}/the/ranks/years`;
const THE_UNIVERSITIES_API_URL = `${THE_API_URL}/universities?year=`;

export default function TheOverview() {
  const [selectedYear, setSelectedYear] = useState('');
  const [url, setUrl] = useState(`${THE_UNIVERSITIES_API_URL}${selectedYear}`);

  const changeYear = (newYear: string) => {
    setSelectedYear(newYear);
    setUrl(`${THE_UNIVERSITIES_API_URL}${newYear}`);
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
        <Grid container item xs={2} mt={2}>
          <Grid container direction={'column'}>
            <Grid container spacing={2} direction={'column'} item xs={4}>
              <Grid item xs={2}>
                <YearsSelectContainer
                  url={THE_RANKS_YEARS_API_URL}
                  selectedYear={selectedYear}
                  changeYear={changeYear}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant={'outlined'}>
                  <CSVLink filename={`THE_${selectedYear}`} data={universities}>
                    Download
                  </CSVLink>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={8} />
          </Grid>
        </Grid>
        <Grid item xs={10}>
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
