import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ApiError } from '../../api/http';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const { ready, token, user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!ready) {
    return (
      <Box minHeight="100dvh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default">
        <CircularProgress />
      </Box>
    );
  }

  if (token && user?.role === 'ADMIN') {
    return <Navigate to={from === '/admin/login' ? '/admin' : from} replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(from.startsWith('/admin') ? from : '/admin', { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Innlogging feilet.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box minHeight="100dvh" display="flex" alignItems="center" bgcolor="background.default" py={4}>
      <Container maxWidth="sm">
        <Stack spacing={2} mb={3}>
          <Typography variant="h4" fontWeight={800}>
            Admin — logg inn
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kun brukere med rolle ADMIN i API-et kan opprette kategorier og produkter.
          </Typography>
        </Stack>

        <Card>
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {error ? <Alert severity="error">{error}</Alert> : null}
                <TextField
                  label="E-post"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Passord"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  {loading ? 'Logger inn…' : 'Logg inn'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/design-a" underline="hover">
            Tilbake til butikken
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
