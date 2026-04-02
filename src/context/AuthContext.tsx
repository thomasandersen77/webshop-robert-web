import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as authApi from '../api/authApi';
import { ApiError } from '../api/http';
import type { UserResponseDto } from '../types/auth';

const TOKEN_KEY = 'webshop_admin_token';
const USER_KEY = 'webshop_admin_user';

type AuthContextValue = {
  ready: boolean;
  token: string | null;
  user: UserResponseDto | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): UserResponseDto | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserResponseDto;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<UserResponseDto | null>(() => readStoredUser());
  const [ready, setReady] = useState(false);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      if (!token) {
        setReady(true);
        return;
      }
      try {
        const me = await authApi.fetchCurrentUser(token);
        if (cancelled) return;
        setUser(me);
        sessionStorage.setItem(USER_KEY, JSON.stringify(me));
      } catch (e) {
        if (cancelled) return;
        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          clearSession();
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }
    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [token, clearSession]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    if (res.user.role !== 'ADMIN') {
      throw new Error('Denne kontoen er ikke administrator.');
    }
    if (!res.user.active) {
      throw new Error('Brukerkontoen er deaktivert.');
    }
    sessionStorage.setItem(TOKEN_KEY, res.accessToken);
    sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setToken(res.accessToken);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({ ready, token, user, login, logout }),
    [ready, token, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Pair with AuthProvider (same module); hook export triggers react-refresh warning if split. */
// eslint-disable-next-line react-refresh/only-export-components -- context + hook pattern
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
