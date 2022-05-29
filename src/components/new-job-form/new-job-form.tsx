import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import * as React from 'react';

export interface MenuItemData {
  value: string;
  label: string;
}

interface NewJobFormProps {
  rankingProvider: string;
  handleChange: (event: SelectChangeEvent) => void;
  rankingProviderOptions: MenuItemData[];
  year: string;
  handleYearChange: (event: SelectChangeEvent) => void;
  yearsOptions: { [rankingProvider: string]: MenuItemData[] };
  onSubmit: () => void;
}

export default function NewJobForm({
  rankingProvider,
  handleChange,
  rankingProviderOptions,
  year,
  handleYearChange,
  yearsOptions,
  onSubmit,
}: NewJobFormProps) {
  return (
    <>
      <Grid item md={2} xs={2}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="ranking-provider-label">Ranking provider</InputLabel>
          <Select
            labelId="ranking-provider-label"
            id="ranking-provider-select"
            value={rankingProvider}
            label="Ranking provider"
            onChange={handleChange}
          >
            {rankingProviderOptions.map((rankingProviderOption) => {
              return (
                <MenuItem value={rankingProviderOption.value}>
                  {rankingProviderOption.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} xs={2}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={year}
            label="Year"
            onChange={handleYearChange}
          >
            {yearsOptions[rankingProvider]?.map((yearOption) => {
              return (
                <MenuItem value={yearOption.value}>{yearOption.label}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2} xs={2}>
        <Button
          fullWidth
          variant={'contained'}
          onClick={onSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
}