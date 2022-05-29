import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavbarContainer from '../components/navbar/navbar-container';

export default function MainPage() {
  return (
    <>
      <NavbarContainer />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        {' '}
        <Typography variant="h2" component="h1" gutterBottom>
          Main page
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'This web is for overview of universities rankings.'}
        </Typography>
      </Container>
    </>
  );
}
