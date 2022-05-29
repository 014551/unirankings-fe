import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface YearsSelectProps {
  years: string[];
  selectedYear: string;
  setSelectedYear: (event: SelectChangeEvent) => void;
}

export const YearsSelect = (props: YearsSelectProps) => {
  const { years, selectedYear, setSelectedYear } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Year</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedYear}
        label="Age"
        onChange={(e) => setSelectedYear(e)}
      >
        {years.map((year) => {
          return (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
