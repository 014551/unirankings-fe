import NavbarContainer from '../components/navbar/navbar-container';
import JobsTableContainer from '../components/jobs-table/jobs-table-container';
import { Grid } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Job } from '../components/jobs-table/model/job';
import NewJobFormContainer from '../components/new-job-form/new-job-form-container';
import useAxios from 'axios-hooks';
import authHeader from '../services/auth-header';
import { API_URL } from '../model/constants';

const JOBS_API_URL = `${API_URL}/jobs`;

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [{ data: beJobs = [], loading, error }] = useAxios<Job[]>(
    {
      url: JOBS_API_URL,
      headers: authHeader(),
    },
    {
      useCache: false,
    }
  );

  React.useEffect(() => {
    setJobs(beJobs);
  }, [beJobs]);

  return (
    <>
      <NavbarContainer />
      <Grid container spacing={2}>
        <Grid container item md={3} sm={12} xs={12} mt={2}>
          <Grid container direction={'column'}>
            <Grid container spacing={1} direction={'column'} item md={6} xs={6}>
              <NewJobFormContainer setJobs={setJobs} />
            </Grid>
            <Grid item md={6} xs={6} />
          </Grid>
        </Grid>
        <Grid item md={9} sm={12} xs={12}>
          <JobsTableContainer error={error} isLoading={loading} jobs={jobs} />
        </Grid>
      </Grid>
    </>
  );
}
