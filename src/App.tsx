import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router';

import 'fontsource-roboto';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MainPage from './pages/main-page';
import TheOverview from './pages/the-overview';
import QsOverview from './pages/qs-overview';
import AdminPage from './pages/admin-page';
import LoginContainer from './components/login/login-container';
import RegistrationContainer from './components/registration/registration-container';
import AuthService from './services/auth-service';
import { Role } from './model/role';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={'lg'}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/the"
              element={
                <RequireAuth>
                  <TheOverview />
                </RequireAuth>
              }
            />
            <Route
              path="/qs"
              element={
                <RequireAuth>
                  <QsOverview />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth requiredRoles={[Role.ROLE_MODERATOR]}>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginContainer />} />
            <Route
              path="/registration"
              element={
                <RequireAuth requiredRoles={[Role.ROLE_ADMIN]}>
                  <RegistrationContainer />
                </RequireAuth>
              }
            />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

function RequireAuth({
  children,
  requiredRoles,
}: {
  children: JSX.Element;
  requiredRoles?: Role[];
}) {
  let user = AuthService.getCurrentUser();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let hasRequiredRoles = true;
  if (requiredRoles) {
    hasRequiredRoles = requiredRoles.every((requiredRole) =>
      user?.roles.includes(requiredRole)
    );
  }
  if (!hasRequiredRoles) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default App;
