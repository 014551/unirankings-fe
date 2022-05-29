import JobsTable from './jobs-table';
import { Job } from './model/job';
import { AxiosError } from 'axios';

interface JobsTableContainerProps {
  error?: AxiosError | null;
  isLoading: boolean;
  jobs: Job[];
}

export default function JobsTableContainer({
  error,
  isLoading,
  jobs,
}: JobsTableContainerProps) {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return <JobsTable jobs={jobs} />;
  }
}
