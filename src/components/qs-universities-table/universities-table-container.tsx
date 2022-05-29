import UniversitiesTable from './universities-table';
import { University } from './model/university';
import { AxiosError } from 'axios';

interface QsUniversitiesTableContainerProps {
  universities: University[];
  error?: AxiosError | null;
  isLoading: boolean;
}

export default function UniversitiesTableContainer({
  universities,
  error,
  isLoading,
}: QsUniversitiesTableContainerProps) {
  return (
    <UniversitiesTable
      rows={universities}
      error={error}
      isLoading={isLoading}
    />
  );
}
