import { apiUrl } from '../config/apiBase';

export class ApiError extends Error {
  readonly status: number;
  readonly body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

function readMessageFromJson(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const o = data as Record<string, unknown>;
  if (typeof o.message === 'string') return o.message;
  if (typeof o.error === 'string' && typeof o.message !== 'string') return o.error;
  return undefined;
}

async function getErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  if (!text) return res.statusText || `HTTP ${res.status}`;
  try {
    const json: unknown = JSON.parse(text);
    return readMessageFromJson(json) ?? text;
  } catch {
    return text;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, headers: hdr, ...rest } = init;
  const headers = new Headers(hdr);
  if (!headers.has('Content-Type') && rest.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(apiUrl(path), { ...rest, headers });

  if (!res.ok) {
    const msg = await getErrorMessage(res);
    throw new ApiError(res.status, msg);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const ct = res.headers.get('content-type');
  if (!ct?.includes('application/json')) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
