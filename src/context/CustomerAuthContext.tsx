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
import * as customerApi from '../api/customerApi';
import { ApiError } from '../api/http';
import type { UserResponseDto } from '../types/auth';

const TOKEN_KEY = 'webshop_customer_token';
const USER_KEY = 'webshop_customer_user';

type CustomerAuthValue = {
  ready: boolean;
  token: string | null;
  user: UserResponseDto | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const CustomerAuthContext = createContext<CustomerAuthValue | null>(null);

function readUser(): UserResponseDto | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserResponseDto;
  } catch {
    return null;
  }
}

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<UserResponseDto | null>(() => readUser());
  const [ready, setReady] = useState(false);

  const clear = useCallback(() => {
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
        if (me.role !== 'CUSTOMER') {
          clear();
          return;
        }
        setUser(me);
        sessionStorage.setItem(USER_KEY, JSON.stringify(me));
      } catch (e) {
        if (cancelled) return;
        if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          clear();
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }
    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [token, clear]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await customerApi.loginCustomer({ email, password });
    if (res.user.role !== 'CUSTOMER') {
      throw new Error('Logg inn med en kundekonto for å handle.');
    }
    if (!res.user.active) {
      throw new Error('Brukerkontoen er deaktivert.');
    }
    sessionStorage.setItem(TOKEN_KEY, res.accessToken);
    sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setToken(res.accessToken);
    setUser(res.user);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await customerApi.registerCustomer({ email, password });
    if (res.user.role !== 'CUSTOMER') {
      throw new Error('Uventet kontotype.');
    }
    sessionStorage.setItem(TOKEN_KEY, res.accessToken);
    sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setToken(res.accessToken);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    clear();
  }, [clear]);

  const value = useMemo(
    () => ({ ready, token, user, login, register, logout }),
    [ready, token, user, login, register, logout],
  );

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCustomerAuth(): CustomerAuthValue {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  return ctx;
}
