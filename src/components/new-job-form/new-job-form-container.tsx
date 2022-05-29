import * as React from 'react';
import { SelectChangeEvent } from '@mui/material';
import NewJobForm, { MenuItemData } from './new-job-form';
import { Job } from '../jobs-table/model/job';
import jobService from '../../services/job-service';

interface NewJobFormContainerProps {
  setJobs: (jobs: Job[]) => void;
}

export default function NewJobFormContainer({
  setJobs,
}: NewJobFormContainerProps) {
  const [rankingProvider, setRankingProvider] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setRankingProvider(event.target.value as string);
  };
  const rankingProviderOptions: MenuItemData[] = [
    {
      value: 'QS_WORLD_UNIVERSITY_RANKINGS',
      label: 'TopUniversities',
    },
    {
      value: 'TIMES_HIGHER_EDUCATION',
      label: 'Times Higher Education',
    },
  ];
  const [year, setYear] = React.useState('');
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  const yearsOptions: { [rankingProvider: string]: MenuItemData[] } = {
    QS_WORLD_UNIVERSITY_RANKINGS: [
      {
        value: '2011',
        label: '2011',
      },
      {
        value: '2012',
        label: '2012',
      },
      {
        value: '2013',
        label: '2013',
      },
      {
        value: '2014',
        label: '2014',
      },
      {
        value: '2015',
        label: '2015',
      },
      {
        value: '2016',
        label: '2016',
      },
      {
        value: '2017',
        label: '2017',
      },
      {
        value: '2018',
        label: '2018',
      },
      {
        value: '2019',
        label: '2019',
      },
      {
        value: '2020',
        label: '2020',
      },
      {
        value: '2021',
        label: '2021',
      },
      {
        value: '2022',
        label: '2022',
      },
    ],
    TIMES_HIGHER_EDUCATION: [
      {
        value: '2016',
        label: '2016',
      },
      {
        value: '2017',
        label: '2017',
      },
      {
        value: '2018',
        label: '2018',
      },
      {
        value: '2019',
        label: '2019',
      },
      {
        value: '2020',
        label: '2020',
      },
      {
        value: '2021',
        label: '2021',
      },
      {
        value: '2022',
        label: '2022',
      },
    ],
  };

  const onSubmit = async () => {
    try {
      await jobService.addNewJob(rankingProvider, year);
      const jobs = await jobService.getJobs();
      setJobs(jobs);
    } catch (e) {
      console.error('Error during adding new job.', e);
    }
  };

  return (
    <NewJobForm
      rankingProvider={rankingProvider}
      handleChange={handleChange}
      rankingProviderOptions={rankingProviderOptions}
      year={year}
      handleYearChange={handleYearChange}
      yearsOptions={yearsOptions}
      onSubmit={onSubmit}
    />
  );
}
