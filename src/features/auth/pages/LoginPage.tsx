import { FormEvent, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 3;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isHydrated, login: setSession } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isHydrated, navigate]);

  if (isHydrated && isAuthenticated) {
    return null;
  }

  if (!isHydrated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  function validate(): boolean {
    const next: typeof errors = {};
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser) {
      next.username = 'Username is required';
    } else if (trimmedUser.length < MIN_USERNAME_LENGTH) {
      next.username = `Username must be at least ${MIN_USERNAME_LENGTH} characters`;
    }

    if (!trimmedPass) {
      next.password = 'Password is required';
    } else if (trimmedPass.length < MIN_PASSWORD_LENGTH) {
      next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await login({
        username: username.trim(),
        password: password.trim(),
      });
      setSession(response.token, { username: username.trim() });
      const state = location.state as LoginLocationState | null;
      navigate(state?.from?.pathname ?? '/dashboard', { replace: true });
    } catch (err: unknown) {
      const apiMessage =
        err instanceof Error ? err.message : null;
      setErrors({
        general:
          apiMessage || 'Unable to sign in. Check your credentials and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled = isSubmitting || !username.trim() || !password.trim();

  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', mt: 8 }}>
      <Paper component="section" elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
          Welcome back!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          Ready to find your next favorite?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Let&apos;s do a little shopping
        </Typography>

        {errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>{errors.general}</Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() =>
              setErrors((prev) => {
                const trimmed = username.trim();
                if (!trimmed) return { ...prev, username: 'Username is required' };
                if (trimmed.length < MIN_USERNAME_LENGTH)
                  return { ...prev, username: `Username must be at least ${MIN_USERNAME_LENGTH} characters` };
                const { username: _, ...rest } = prev;
                return rest;
              })
            }
            error={Boolean(errors.username)}
            helperText={errors.username}
            autoComplete="username"
            autoFocus
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setErrors((prev) => {
                const trimmed = password.trim();
                if (!trimmed) return { ...prev, password: 'Password is required' };
                if (trimmed.length < MIN_PASSWORD_LENGTH)
                  return { ...prev, password: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
                const { password: _, ...rest } = prev;
                return rest;
              })
            }
            error={Boolean(errors.password)}
            helperText={errors.password}
            autoComplete="current-password"
            required
          />
          <Button type="submit" variant="contained" disabled={isDisabled}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
