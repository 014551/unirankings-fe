import { University } from './model/university';
import UniversitiesTable from './universities-table';
import { AxiosError } from 'axios';

interface UniversitiesTableContainerProps {
  universities: University[];
  error?: AxiosError | null;
  isLoading: boolean;
}

export default function UniversitiesTableContainer({
  universities,
  error,
  isLoading,
}: UniversitiesTableContainerProps) {
  return (
    <UniversitiesTable
      rows={universities}
      error={error}
      isLoading={isLoading}
    />
  );
}
