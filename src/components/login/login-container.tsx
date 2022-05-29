import React, { useState } from 'react';
import { Alert, Button, Grid, TextField } from '@mui/material';
import NavbarContainer from '../navbar/navbar-container';
import AuthService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

export default function LoginContainer() {
  let navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = () => {
    setMessage('');
    AuthService.login(email, password).then(
      () => {
        navigate('/');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <>
      <NavbarContainer />
      <Grid container spacing={2}>
        <Grid item lg={5} mt={5} sm={5} />
        <Grid item container direction={'column'} lg={2} mt={2} sm={2}>
          <TextField
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value as string)}
            label="Email"
            defaultValue="john_doe@example.com"
            variant="standard"
            type={'email'}
            sx={{ mt: 2 }}
          />
          <TextField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value as string)}
            label="Password"
            type={'password'}
            autoComplete="current-password"
            variant="standard"
            sx={{ mt: 2 }}
          />
          <Button variant={'outlined'} sx={{ mt: 2 }} onClick={onSubmit}>
            Login
          </Button>
          {message && (
            <Alert sx={{ mt: 2 }} severity="error">
              {message}
            </Alert>
          )}
        </Grid>
        <Grid item lg={5} mt={5} sm={5} />
      </Grid>
    </>
  );
}
