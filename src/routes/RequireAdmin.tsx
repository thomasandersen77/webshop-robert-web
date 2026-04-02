import { Alert, Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { ready, token, user, logout } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <Box
        minHeight="100dvh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (user?.role !== 'ADMIN') {
    return (
      <Box minHeight="100dvh" display="flex" alignItems="center" bgcolor="background.default" py={4}>
        <Container maxWidth="sm">
          <Alert severity="error" sx={{ mb: 2 }}>
            Du har ikke administrator-tilgang.
          </Alert>
          <Button variant="contained" onClick={logout}>
            Logg ut
          </Button>
        </Container>
      </Box>
    );
  }

  return <>{children}</>;
}

export function AdminGateTitle() {
  return (
    <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
      Admin
    </Typography>
  );
}
