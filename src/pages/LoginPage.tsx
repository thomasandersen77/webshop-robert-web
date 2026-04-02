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
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { ApiError } from '../api/http';
import { useCustomerAuth } from '../context/CustomerAuthContext';

export default function LoginPage() {
  const { ready, token, user, login } = useCustomerAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!ready) {
    return (
      <Box minHeight="50vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (token && user?.role === 'CUSTOMER') {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/', { replace: true });
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
    <Box minHeight="60vh" display="flex" alignItems="center" bgcolor="background.default" py={4}>
      <Container maxWidth="sm">
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Logg inn
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Kundekonto kreves for handlekurv (API).
        </Typography>
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
        <Typography variant="body2" sx={{ mt: 2 }}>
          Har du ikke konto?{' '}
          <Link component={RouterLink} to="/register">
            Registrer deg
          </Link>
        </Typography>
        <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 1, display: 'inline-block' }}>
          Tilbake til butikken
        </Link>
      </Container>
    </Box>
  );
}
