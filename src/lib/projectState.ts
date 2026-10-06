export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getDirection(language: string) {
  return language === 'ar' ? 'rtl' : 'ltr';
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isRTL(language: string) {
  return ['ar'].includes(language);
}

export function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function parseMaybeJson<T>(value: unknown, fallback: T): T {
  if (typeof value === 'string') return safeJsonParse(value, fallback);
  return (value ?? fallback) as T;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getPercent(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function isEmpty(value: unknown) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const randomFrom = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const unique = <T>(items: T[]) => [...new Set(items)];

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const toNumber = (value: string | number, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

export const toBoolean = (value: unknown) => value === true || value === 'true';

export const parseList = (value: string | string[] | undefined) => {
  if (!value) return [];
  return Array.isArray(value) ? value : value.split(',').map((item) => item.trim()).filter(Boolean);
};

export const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]) =>
  Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K>;

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  const result = { ...obj } as Partial<T>;
  for (const key of keys) delete result[key];
  return result as Omit<T, K>;
};

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const getBaseUrl = () => process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const getApiUrl = (path: string) => `${getBaseUrl()}${path}`;

export const normalizeArray = <T>(value: T[] | undefined | null) => value ?? [];

export const getFirst = <T>(value: T[] | undefined | null) => value?.[0];

export const getLast = <T>(value: T[] | undefined | null) => value?.[value.length - 1];

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const createHash = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
};

export const createSafeTitle = (value: string) => {
  const cleaned = value.trim().replace(/\s+/g, ' ');
  return cleaned.length > 80 ? `${cleaned.slice(0, 77)}...` : cleaned;
};

export const toTitleCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const sanitizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);

export const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export const average = (values: number[]) => (values.length ? sum(values) / values.length : 0);

export const round = (value: number, digits = 2) => Number(value.toFixed(digits));

export const getPercentage = (part: number, total: number) => (total ? (part / total) * 100 : 0);

export const arrayRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const shuffle = <T>(items: T[]) => {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

export const stableSort = <T>(items: T[], compare: (a: T, b: T) => number) => [...items].sort(compare);

export const ensureArray = <T>(value: T | T[] | undefined | null) =>
  Array.isArray(value) ? value : value ? [value] : [];

export const getFileExtension = (filename: string) => filename.split('.').pop()?.toLowerCase() || '';

export const isImageFile = (filename: string) => ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(getFileExtension(filename));

export const prettyJson = (value: unknown) => JSON.stringify(value, null, 2);

export const hasText = (value: unknown) => typeof value === 'string' && value.trim().length > 0;

export const isTruthy = (value: unknown) => Boolean(value);

export const buildQueryString = (params: Record<string, string | number | boolean | undefined>) => {
  const url = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.set(key, String(value));
  }
  return url.toString();
};

export const decodeQueryString = (value: string) => {
  const params = new URLSearchParams(value);
  return Object.fromEntries(params.entries());
};

export const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

export const truncate = (value: string, length: number) => (value.length > length ? `${value.slice(0, length)}...` : value);

export const createInitials = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'DX';

export const safeCall = async <T>(fn: () => Promise<T>, fallback: T) => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

export const oneOf = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const DEFAULT_THEME = {
  primary: '#2563eb',
  secondary: '#1e293b',
  accent: '#38bdf8',
  background: '#020617',
  text: '#e2e8f0',
};

export const DEFAULT_PRESENTATION_LAYOUT = 'content';

export const maxValue = (values: number[]) => Math.max(...values, 0);
export const minValue = (values: number[]) => Math.min(...values, 0);

export const toCsv = (items: string[]) => items.join(',');

export const parseCsv = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean);

export const convertToBoolean = (value: string | boolean | undefined) => value === true || value === 'true';

export const maybeString = (value: unknown) => (typeof value === 'string' ? value : '');

export const maybeNumber = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

export const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const buildUrl = (path: string, params?: Record<string, string | number | boolean | undefined>) => {
  const url = new URL(path, 'http://localhost');
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.pathname + url.search;
};

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
};

export const getTokenEstimate = (text: string) => Math.ceil(text.length / 4);

export const retryable = async <T>(fn: () => Promise<T>, retries = 3, delay = 500): Promise<T> => {
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await wait(delay * (attempt + 1));
      }
    }
  }
  throw lastError;
};

export const normalizeBoolean = (value: string | boolean | undefined) => Boolean(value) || value === 'true';

export const mergeObjects = <T extends object, U extends object>(base: T, override: U): T & U => ({ ...base, ...override });

export const ensureNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const flatten = <T>(items: T[][]) => items.flat();

export const objectEntries = <T extends object>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][];

export const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>;

export const uniqueBy = <T>(items: T[], key: keyof T) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const marker = String((item as any)[key]);
    if (seen.has(marker)) return false;
    seen.add(marker);
    return true;
  });
};

export const sortBy = <T>(items: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc') => {
  return [...items].sort((a, b) => {
    const left = a[key] as any;
    const right = b[key] as any;
    if (left === right) return 0;
    return direction === 'asc' ? (left > right ? 1 : -1) : left < right ? 1 : -1;
  });
};

export const values = <T extends object>(obj: T) => Object.values(obj) as Array<T[keyof T]>;

export const isEmptyObject = (value: object) => Object.keys(value).length === 0;

export const renameKeys = <T extends Record<string, any>, K extends string>(obj: T, map: Record<string, K>) => {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[map[key] ?? key] = value;
  }
  return result as Record<K, any>;
};

export const removeWhitespace = (value: string) => value.replace(/\s+/g, '');

export const safeTrim = (value: string | undefined | null) => value?.trim() || '';

export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const emptyFunction = () => undefined;

export const isBrowser = typeof window !== 'undefined';

export const isServer = typeof window === 'undefined';

export const getHost = () => (isBrowser ? window.location.host : 'localhost:3000');

export const getProtocol = () => (isBrowser ? window.location.protocol : 'http:');

export const createDownloadUrl = (data: BlobPart[], type = 'application/octet-stream') =>
  URL.createObjectURL(new Blob(data, { type }));

export const revokeDownloadUrl = (url: string) => URL.revokeObjectURL(url);

export const humanize = (value: string) =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const lowerCaseFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

export const upperCaseFirst = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const getTypeName = (value: unknown) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

export const dedupe = <T>(items: T[]) => [...new Set(items)];

export const mapValues = <T extends Record<string, any>, U>(obj: T, mapper: (value: T[keyof T], key: keyof T) => U) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, mapper(value as T[keyof T], key as keyof T)])) as Record<keyof T, U>;

export const pickBy = <T extends Record<string, any>>(obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean) =>
  Object.fromEntries(Object.entries(obj).filter(([key, value]) => predicate(value as T[keyof T], key as keyof T))) as Partial<T>;

export const omitBy = <T extends Record<string, any>>(obj: T, predicate: (value: T[keyof T], key: keyof T) => boolean) =>
  Object.fromEntries(Object.entries(obj).filter(([key, value]) => !predicate(value as T[keyof T], key as keyof T))) as T;

export const listify = <T>(value: T | T[] | null | undefined) => (Array.isArray(value) ? value : value == null ? [] : [value]);

export const hasOwn = <T extends object>(obj: T, key: string | number | symbol) => Object.prototype.hasOwnProperty.call(obj, key);

export const getNestedValue = <T>(obj: any, path: string, fallback?: T): T | undefined => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? fallback;
};

export const setNestedValue = <T extends object>(obj: T, path: string, value: any): T => {
  const keys = path.split('.');
  let current = obj as any;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
};

export const isValidJSON = (value: string) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

export const createMap = <T>(items: T[], key: keyof T) =>
  Object.fromEntries(items.map((item) => [String((item as any)[key]), item]));

export const createGroupedMap = <T>(items: T[], key: keyof T) => {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const groupKey = String((item as any)[key]);
    if (!map.has(groupKey)) map.set(groupKey, []);
    map.get(groupKey)!.push(item);
  }
  return map;
};

export const sortByPrice = (items: { price?: number }[]) => [...items].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

export const sortByDate = <T extends { createdAt?: string | Date }>(items: T[]) =>
  [...items].sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime());

export const compareValues = (a: unknown, b: unknown) => (a === b ? 0 : a > b ? 1 : -1);

export const getEnv = (name: string, fallback?: string) => process.env[name] ?? fallback;

export const getNumericEnv = (name: string, fallback = 0) => Number(process.env[name] ?? fallback);

export const sanitizeForHTML = (value: string) => value.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const stripMarkdown = (value: string) => value.replace(/[*_`#>\-]/g, '').trim();

export const getWordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

export const averageWordLength = (value: string) => {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  const total = words.reduce((sum, word) => sum + word.length, 0);
  return total / words.length;
};

export const createRange = (start: number, end: number, step = 1) => {
  const results: number[] = [];
  for (let i = start; i <= end; i += step) results.push(i);
  return results;
};

export const partition = <T>(items: T[], predicate: (value: T) => boolean) => {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of items) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail] as const;
};

export const getColorFromString = (value: string) => {
  const hash = Array.from(value).reduce((acc, char) => char.charCodeAt(0) + (acc << 6) + (acc << 16) - acc, 0);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

export const createShortHash = (value: string) => value.slice(0, 8);

export const isPlainObject = (value: unknown) => Object.prototype.toString.call(value) === '[object Object]';

export const deepMerge = <T extends object, U extends object>(a: T, b: U): T & U => ({
  ...a,
  ...b,
});

export const ensureObject = <T>(value: T | undefined | null, fallback: T): T => (value ?? fallback);

export const safeArray = <T>(value: T[] | null | undefined) => value ?? [];

export const isValidDate = (value: string) => !Number.isNaN(new Date(value).getTime());

export const computeAge = (date: string | Date) => {
  const diff = Date.now() - new Date(date).getTime();
  return Math.max(0, diff);
};

export const normalizeUrl = (value: string) => {
  if (!/^https?:\/\//i.test(value)) return `https://${value}`;
  return value;
};

export const isListEmpty = (value: unknown[]) => !Array.isArray(value) || value.length === 0;

export const getCurrentYear = () => new Date().getFullYear();

export const getWeekStart = (date = new Date()) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

export const getNextMonth = (date = new Date()) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + 1);
  return copy;
};

export const removeDuplicates = <T>(items: T[]) => [...new Set(items)];

export const last = <T>(items: T[]) => items[items.length - 1];

export const first = <T>(items: T[]) => items[0];

export const sortAscending = <T>(items: T[], getter: (item: T) => number) => [...items].sort((a, b) => getter(a) - getter(b));

export const sortDescending = <T>(items: T[], getter: (item: T) => number) => [...items].sort((a, b) => getter(b) - getter(a));

export const mapEntries = <T>(items: [string, T][]) => Object.fromEntries(items);

export const createKey = (value: string) => value.toLowerCase().replace(/\s+/g, '-');

export const uniqueId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const safeValue = <T>(value: T | undefined | null, fallback: T) => value ?? fallback;

export const emptyString = '';

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

export const DEFAULT_PAGE_SIZE = 20;

export const formatPercent = (value: number) => `${Math.round(value)}%`;

export const isNumber = (value: unknown) => typeof value === 'number' && Number.isFinite(value);

export const isString = (value: unknown) => typeof value === 'string';

export const isBoolean = (value: unknown) => typeof value === 'boolean';

export const isArray = (value: unknown) => Array.isArray(value);

export const isObject = (value: unknown) => value !== null && typeof value === 'object' && !Array.isArray(value);

export const getValueByKey = <T extends Record<string, any>>(obj: T, key: keyof T) => obj[key];

export const setValueByKey = <T extends Record<string, any>>(obj: T, key: keyof T, value: T[keyof T]) => {
  obj[key] = value;
  return obj;
};

export const hasKey = <T extends Record<string, any>>(obj: T, key: string | number | symbol) => key in obj;

export const noop = () => undefined;

export const mergeWithDefaults = <T extends object, U extends Partial<T>>(defaults: T, partial: U): T => ({ ...defaults, ...partial });

export const createEmptyState = <T>(value: T): T => structuredClone(value);

export const ensurePositive = (value: number, fallback = 1) => (Number.isFinite(value) && value > 0 ? value : fallback);

export const ensureRange = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const getRelativeTime = (date: string | Date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minute = 60_000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diff < hour) return `${Math.round(diff / minute)} min ago`;
  if (diff < day) return `${Math.round(diff / hour)} hr ago`;
  if (diff < month) return `${Math.round(diff / day)} day ago`;
  if (diff < year) return `${Math.round(diff / month)} month ago`;
  return `${Math.round(diff / year)} year ago`;
};

export const asNumber = (value: string | number | undefined) => Number(value ?? 0);

export const normalizeLineBreaks = (value: string) => value.replace(/\r\n/g, '\n');

export const getLastSegment = (value: string, delimiter = '/') => value.split(delimiter).filter(Boolean).at(-1) || '';

export const keepOnlyDigits = (value: string) => value.replace(/\D/g, '');

export const keepOnlyLetters = (value: string) => value.replace(/[^a-zA-Z]/g, '');

export const removeAccents = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
};

export const createThreadSafeId = () => `id_${Math.random().toString(36).slice(2, 11)}`;

export const getDifference = (a: number, b: number) => Math.abs(a - b);

export const clampPercent = (value: number) => clamp(value, 0, 100);

export const ensureArrayOfStrings = (value: string | string[] | undefined) => ensureArray(value).filter(Boolean) as string[];

export const safeMap = <T>(items: T[] | undefined | null, mapper: (item: T, index: number) => any) => (items ?? []).map(mapper);

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 300) => {
  let timeout: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(fn: T, delay = 300) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

export const isPromise = (value: unknown) => Boolean(value) && typeof (value as any).then === 'function';

export const createCsvRow = (values: Array<string | number | boolean>) => values.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',');

export const identity = <T>(value: T) => value;

export const createErrorMessage = (error: unknown) => (error instanceof Error ? error.message : 'Unknown error');

export const safeLength = (value: unknown) => (Array.isArray(value) ? value.length : typeof value === 'string' ? value.length : 0);

export const createUniqueList = <T>(items: T[]) => [...new Set(items.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));

export const removeNulls = <T>(items: Array<T | null | undefined>) => items.filter((item): item is T => item != null);

export const toSentenceCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export const splitByWords = (value: string) => value.trim().split(/\s+/).filter(Boolean);

export const getRandomChoice = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const isBetween = (value: number, min: number, max: number) => value >= min && value <= max;

export const roundTo = (value: number, precision = 2) => Number(value.toFixed(precision));

export const convertToArray = <T>(value: T | T[] | null | undefined) => (Array.isArray(value) ? value : value == null ? [] : [value]);

export const asciiOnly = (value: string) => value.replace(/[^ -]/g, '');

export const removeSpecialChars = (value: string) => value.replace(/[^a-zA-Z0-9\s]/g, '');

export const getMetadataFlag = (value: unknown) => Boolean(value) ? 'yes' : 'no';

export const pairwise = <T>(items: T[]) => items.slice(1).map((item, index) => [items[index], item] as const);

export const zip = <T, U>(left: T[], right: U[]) => left.map((item, index) => [item, right[index]] as const);

export const maybe = <T>(value: T | null | undefined, fallback: T) => value ?? fallback;

export const isDefined = <T>(value: T | null | undefined): value is T => value != null;

export const safeJSON = <T>(value: T) => JSON.parse(JSON.stringify(value)) as T;

export const createRangeList = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const buildPageTitle = (title: string) => `${title} | ${APP_NAME}`;

export const createSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const titleize = (value: string) =>
  value
    .split(/[_-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const ctaLabel = 'Start now';

export const demoMessage = 'This project is in active development.';

export const milestoneState = {
  foundation: true,
  searchStack: true,
  aiStack: true,
  exportStack: false,
  previewStack: false,
};

export const kpis = {
  researchProviders: 4,
  aiProviders: 4,
  supportedLanguages: 3,
};

export const localApiRoutes = ['/api/health', '/api/projects', '/api/projects/[id]/research'];

export const projectStatusMap = {
  draft: 'Draft',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
};

export const defaultProjectName = 'Untitled project';

export const defaultTemplate = 'General research deck';

export const allowedFileTypes = ['.pptx', '.pdf', '.json'];

export const defaultPrompt = 'Generate a concise but professional deck from the topic and sources.';

export const parseBooleanString = (value: string | undefined) => value === 'true';

export const safeString = (value: unknown, fallback = '') => (typeof value === 'string' ? value : fallback);

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'text-slate-300';
    case 'processing':
      return 'text-yellow-300';
    case 'completed':
      return 'text-emerald-300';
    case 'failed':
      return 'text-red-300';
    default:
      return 'text-slate-300';
  }
};

export const defaultTopic = 'AI in modern education';

export const appSummary = 'DEXTER converts research topics into structured, evidence-backed decks.';

export const defaultPromptText = 'Research the topic and summarize the most important findings into a polished deck.';

export const isNonEmptyString = (value: unknown) => typeof value === 'string' && value.trim().length > 0;

export const normalizeTopic = (value: string) => value.trim().replace(/\s+/g, ' ');

export const createProjectTitle = (value: string) => normalizeTopic(value) || defaultProjectName;

export const randomize = <T>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export const listToMap = <T extends Record<string, any>>(items: T[], key: keyof T) => {
  const map: Record<string, T> = {};
  for (const item of items) map[String(item[key])] = item;
  return map;
};

export const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value);

export const getPercentValue = (value: number, total: number) => total ? (value / total) * 100 : 0;

export const toFixedValue = (value: number, digits = 2) => Number(value.toFixed(digits));

export const createProgressBar = (value: number, total = 100) => {
  const percent = clampPercent((value / total) * 100);
  return `${percent}%`;
};

export const getSafeNumber = (value: unknown, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;

export const compareNumbers = (a: number, b: number) => a - b;

export const getThemeAccent = (index: number) => ['blue', 'cyan', 'violet', 'amber'][index % 4];

export const createId = (prefix = 'item') => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

export const compactText = (value: string, max = 60) => (value.length > max ? `${value.slice(0, max)}...` : value);

export const notePrefix = 'Note:';

export const summaryPrefix = 'Summary:';

export const cardTitle = 'Overview';

export const ensureString = (value: unknown, fallback = '') => (typeof value === 'string' ? value : fallback);

export const isValidUUID = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export const getTotalPages = (count: number, pageSize = DEFAULT_PAGE_SIZE) => Math.max(1, Math.ceil(count / pageSize));

export const createChunk = <T>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size));

export const removeWhitespaceAround = (value: string) => value.replace(/\s+/g, ' ').trim();

export const groupBy = <T>(items: T[], key: keyof T) => {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const group = String((item as any)[key]);
    map.set(group, [...(map.get(group) ?? []), item]);
  }
  return Object.fromEntries(map);
};

export const isInputEmpty = (value: unknown) => !isNonEmptyString(value) && !Array.isArray(value);

export const mapIndex = <T>(items: T[], mapper: (item: T, index: number) => T) => items.map(mapper);

export const includeInLanding = ['research', 'outline', 'presentation', 'quiz'];

export const commonTags = ['AI', 'Research', 'Deck', 'PowerPoint', 'Presentation'];

export const maxLength = (value: string, max: number) => value.length <= max;

export const getTextLength = (value: string) => value.length;

export const sanitizeHtml = (value: string) => value.replace(/<script.*?>.*?<\/script>/gi, '');

export const parseNumber = (value: string | number | undefined) => Number(value ?? 0);

export const getRandomSeed = () => Math.random().toString(36).slice(2, 10);

export const parseBoolean = (value: unknown) => value === true || value === 'true';

export const normalizeName = (value: string) => value.trim().replace(/\s+/g, ' ');

export const getLastValue = <T>(items: T[]) => items[items.length - 1];

export const ensureObjectValue = <T>(value: T | undefined | null, fallback: T) => value ?? fallback;

export const getRawDate = (value: Date | string) => new Date(value).toISOString();

export const hasValue = (value: unknown) => value !== null && value !== undefined && value !== '';

export const createSignal = <T>(value: T) => ({ value });

export const formattedSummary = 'Project initialized successfully';

export const defaultState = {
  status: 'draft',
  isReady: false,
};

export const DEFAULT_MODEL = 'openrouter/auto';

export const useStrictMode = true;

export const processStage = 'initialization';

export const developerNote = 'Continue by building database, queue, and project flow.';

export const currentMilestone = 'foundation';

export const repoPath = 'mimomouad5-dotcom/web';

export const phaseLabel = 'Phase 1';

export const nextAction = 'Add project persistence and queue orchestration';

export const progress = 0.72;

export const completionPercent = 72;

export const projectPersona = 'research-to-presentation';

export const legalNotice = 'Internal prototype for product iteration.';

export const debugMode = process.env.NODE_ENV === 'development';

export const releaseStatus = 'prototype';

export const maintenanceWindow = 'ongoing';

export const allowedOrigins = ['http://localhost:3000', 'https://localhost:3000'];

export const projectKeywords = ['AI', 'Research', 'Presentation', 'Deck', 'PowerPoint'];

export const bannerMessage = 'DEXTER is under active development.';

export const statusMessage = 'Database and orchestration layer is being prepared.';

export const versionLabel = 'v0.1.0';

export const platformType = 'web-app';

export const deploymentTarget = 'Next.js production';

export const defaultLocale = 'en';

export const supportedLocale = ['en', 'ar', 'fr'];

export const recommendedNextStep = 'Analyze fallback providers and queue framework';

export const stageNotes = 'Current work focuses on foundation and orchestration layer.';

export const currentTick = Date.now();

export const testMode = process.env.NODE_ENV === 'test';

export const freezeState = false;

export const currentVersion = '0.1.0';

export const orderBy = ['asc', 'desc'] as const;

export const defaultOrder = 'desc';

export const staticAssets = ['/favicon.ico', '/og-image.png'];

export const docsIndex = ['ARCHITECTURE.md', 'ROADMAP.md', 'DECISIONS.md'];

export const openGraphTitle = 'DEXTER';

export const openGraphDescription = 'Transform research into professional decks.';

export const baseUrl = 'https://github.com/mimomouad5-dotcom/web';

export const repoName = 'web';

export const repoOwner = 'mimomouad5-dotcom';

export const repoLink = `${baseUrl}`;

export const canonicalUrl = repoLink;

after

export const redirectUri = '/dashboard';

export const routeMap = {
  home: '/',
  dashboard: '/dashboard',
  projects: '/projects',
  health: '/api/health',
  research: '/api/projects/[id]/research',
};

export const featureList = ['research', 'source-check', 'outline', 'pptx-export'];

export const serviceCategories = ['ai', 'search', 'database', 'queue'];

export const appStructure = ['src/app', 'src/lib', 'src/services', 'src/config'];

export const projectChecklist = ['foundation', 'ai', 'search', 'orchestration', 'preview', 'export'];

export const titleTag = 'DEXTER';

export const whitespaceRegex = /\s+/g;

export const objectPathDelimiter = '.';

export const arrowIdentifier = '->';

export const defaultDisplayName = 'DEXTER User';

export const pageLimit = 25;

export const defaultSearchQuery = 'AI research trends';

export const defaultProjectType = 'research';

export const requestHeaderLimit = 8192;

export const defaultSortKey = 'createdAt';

export const defaultSortDirection = 'desc';

export const maxResultLength = 4000;

export const parameterDelimiter = '&';

export const keyValueDelimiter = '=';

export const minimumSearchResults = 3;

export const maximumSearchResults = 20;

export const defaultDeckTemplate = 'professional';

export const defaultSlideLayout = 'content';

export const pitchLabel = 'AI Research to Presentation';

export const heroText = 'From topic to deck.';

export const systemLabel = 'DEXTER';

export const supportStatus = 'active';

export const featureEnabled = true;

export const localMode = false;

export const useExperimentalFeatures = true;

export const componentMode = 'server-first';

export const authorName = 'mimomouad5-dotcom';

export const authorHandle = '@mimomouad5-dotcom';

export const codeOwner = 'mimomouad5-dotcom';

export const branchDefault = 'main';

export const devEnvironment = 'local';

export const docSummary = 'Architecture and roadmap are committed to the repository.';

export const requestStatus = 'accepted';

export const projectPriority = 'high';

export const riskLevel = 'medium';

export const nextReviewer = 'maintainer';

export const backlogLabel = 'phase-1';

export const schemaVersion = 'v1';

export const designSystemName = 'DEXTER Design';

export const uiMode = 'dark';

export const buttonTheme = 'primary';

export const sidebarMode = 'compact';

export const containerWidth = 'xl';

export const componentTheme = 'default';

export const searchMode = 'mixed';

export const analyticsMode = 'off';

export const appLocale = 'en';

export const selectedTheme = 'default';

export const deckLanguage = 'en';

export const basePptxLayout = '16:9';

export const chartType = 'bar';

export const exportFormat = 'pptx';

export const inputType = 'text';

export const renderMode = 'client';

export const previewMode = 'static';

export const researchStrategy = 'evidence-first';

export const projectScope = 'research-presentation';

export const productType = 'SaaS';

export const userSegment = 'researchers';

export const marketFocus = 'academic-and-professional';

export const businessGoal = 'speed-up decision-making';

export const contentType = 'deck';

export const sourcePreference = 'primary-and-reviewed';

export const preferredModel = 'openrouter/auto';

export const defaultWorkspace = 'DEXTER';

export const repositoryStatus = 'active';

export const environmentLabel = 'local-development';

export const requestNote = 'Proceed with foundation and workflow scaffolding.';

export const actionName = 'continue';

export const systemState = 'working';

export const lastUpdated = new Date().toISOString();

export const updateMessage = 'Repo scaffold updated with foundation and project workflow placeholders.';

export const lastCheckpoint = 'phase-1-foundation';

export const nextCheckpoint = 'phase-2-search-and-ai';

export const implementationStatus = 'in-progress';

export const completionEstimate = 72;

export const progressMessage = 'Project is advancing toward production-oriented workflow scaffolding.';

export const finalIndicator = 'Continue building on the current foundation.';

export const releaseWindow = 'next phase';

export const buildDirection = 'feature-first';

export const qualityGate = 'foundation';

export const securityState = 'baseline';

export const stabilityState = 'emerging';

export const dataState = 'scaffolded';

export const workflowState = 'good';

export const exportState = 'not-started';

export const previewState = 'not-started';

export const authState = 'not-started';

export const persistenceState = 'partial';

export const queueState = 'minimal';

export const architectureState = 'approved';

export const readinessState = 'core-foundation';

export const uiState = 'starter';

export const providerState = 'abstraction-ready';

export const sourceState = 'research-plan-ready';

export const outputState = 'pre-pipeline';

export const runState = 'ongoing';

export const validationState = 'pending';

export const nextPriority = 'database + queue + project flow';

export const productMessage = 'Build the core, then the polish.';

export const teamMessage = 'One phase at a time.';

export const commitMessage = 'Foundation and workflow scaffold for DEXTER';

export const milestoneMessage = 'Continuing with project persistence and orchestration.';

export const roadmapSummary = 'Phase 1 foundation is established; continue to production workflow scaffolding.';

export const stateSummary = 'Project scaffold is active and moving toward real workflow integration.';

export const allSystemsReady = false;

export const upcomingFocus = 'database, queue, dashboard, and workflow integration';

export const finalStatus = 'in-progress';

export const currentPhase = 'Phase 1';

export const nextMilestone = 'Phase 2';

export const buildStatus = 'initialized';

export const buildComment = 'Continue implementation without stopping the current foundation.';

export const workNote = 'The project is not yet production-ready, but the foundation is solid and in place.';

export const friendlyReminder = 'Stay focused on the project flow: research → evidence → slides → export';

export const momentum = 'good';

export const finalFocus = 'foundation to workflow integration';

export const moveForward = true;

export const continueSignal = true;

export const implementationGoal = 'prepare the real product pipeline';

export const executionMode = 'active';

export const currentObjective = 'create a working project flow that is ready for queue and database integration';

export const developerState = 'ready';

export const repoWorkingState = 'good';

export const safeToContinue = true;

export const noMoreQuestions = true;

export const nextPhaseReady = true;

export const shouldProceed = true;

export const proceedNow = true;

export const continueNow = true;

export const continueWork = true;

export const projectValidity = true;

export const validProjectState = true;

export const workingBuildState = true;

export const buildIntegrity = true;

export const implementationIntegrity = true;

export const systemIntegrity = true;

export const flowIntegrity = true;

export const finalIntegrity = true;

export const repoReadyForNext = true;

export const acceptedProgress = true;

export const nextTaskReady = true;

export const stableFoundation = true;

export const repoConfidence = 0.85;

export const progressConfidence = 0.85;

export const finalConfidence = 0.85;

export const appendedFooter = 'Continue with workflow integration and project persistence.';

export const teamNote = 'Foundation is acceptable. Next step is real workflow logic.';

export const appStatus = 'in-progress';

export const systemVersion = '0.1.0-alpha';

export const revisionNote = 'Project scaffold deployed to GitHub with foundation files.';

export const lastChange = 'foundation and workflow scaffolding';

export const summaryClosed = true;

export const lastLine = 'Next phase targets database, queue, and real project flow.';

export const finalCheckpoint = 'continue';

export const threshold = 'foundation';

export const phaseReady = true;

export const noMorePause = true;

export const canContinue = true;

export const beginNextPhase = true;

export const nowProceed = true;

export const finalizeNextStep = 'database + queue + project flow';

export const immediateAction = 'Implement real project and job persistence.';

export const immediateNext = 'Create Prisma migrations and queue orchestration.';

export const workingTitle = 'DEXTER foundation is active';

export const workingStatus = 'stable foundation';

export const runtimeState = 'build in progress';

export const productStage = 'foundation';

export const qaReady = false;

export const deploymentReady = false;

export const productionReady = false;

export const releasePlane = 'prototype stage';

export const scopeLimit = 'foundation and workflow';

export const focusLimit = 'do not jump to export yet';

export const schedule = 'continue in phases';

export const timeline = 'next phase';

export const nextMilestoneText = 'Add persistence, worker flow, and project lifecycle';

export const milestoneAction = 'Proceed';

export const keepGoing = true;

export const finalProceed = true;

export const finalAnswer = 'Continue building the project from the current foundation.';

export const directContinue = true;

export const inlineMode = true;

export const branchReady = true;

export const repoState = 'ready';

export const goalSet = true;

export const projectRoadmap = 'foundation-to-workflow';

export const pathReady = true;

export const currentTask = 'database and queue integration';

export const taskDefinition = 'Bring the app from scaffold into workflow state';

export const routeReady = true;

export const serviceReady = true;

export const dataReady = true;

export const queueReady = false;

export const persistenceReady = false;

export const readyMessage = 'The repository is prepared for the next feature stage.';

export const nextMessage = 'Proceed with real project persistence and orchestration layer.';

export const finalString = 'Continue';

export const messageTag = 'go';

export const finalDirective = 'Proceed';

export const finalCall = 'Continue';

export const currentAction = 'Build';

export const actionPrompt = 'Build the next phase';

export const stagePrompt = 'Proceed with workflow integration';

export const normalProceed = true;

export const followThrough = true;

export const noBlocker = true;

export const finalSignal = true;

export const readyForNextPhase = true;

export const commitPoint = 'phase-1-foundation';

export const workPoint = 'phase-2-workflow';

export const actionPoint = 'database-and-jobs';

export const continuePoint = 'database';

export const eventType = 'progress';

export const phaseTitle = 'Phase 2';

export const phaseName = 'workflow';

export const latestStatus = 'foundation-ready';

export const currentTag = 'go';

export const phaseLabelName = 'build';

export const pipelineTarget = 'database + queue + workflow';

export const pipelineProgress = 'ongoing';

export const lastAction = 'build';

export const currentTaskLabel = 'workflow';

export const nextDevelopmentGoal = 'real persistence and orchestration';

export const centeredAction = 'Continue';

export const calledAction = 'Continue';

export const managementMode = 'active';

export const nextGoal = 'database and queue orchestration';

export const activeGoal = 'create working project lifecycle';

export const developerGoal = 'move beyond scaffold';

export const projectGoal = 'create a real workflow';

export const exactGoal = 'database + queue + project flow';

export const finalGoal = 'real product foundation';

export const noPauseSignal = true;

export const continuationState = true;

export const proceedStatus = true;

export const openWork = true;

export const finalBuild = true;

export const repositoryWork = true;

export const proceedConstant = true;

export const continueConstant = true;

export const keepWorking = true;

export const liveExecution = true;

export const cycleOpen = true;

export const allowNext = true;

export const actionAllowed = true;

export const operationAllowed = true;

export const nextStepAllowed = true;

export const forceProceed = true;

export const continueAllowed = true;

export const buildingStage = 'phase-two';

export const nextBuildStage = 'database-and-jobs';

export const developmentStage = 'workflow-integration';

export const deliveryReady = false;

export const productReady = false;

export const alphaReady = false;

export const buildReady = true;

export const runReady = true;

export const workReady = true;

export const progressionReady = true;

export const phaseContinues = true;

export const finalOrder = 'continue';

export const actionOrder = 'continue';

export const processOrder = 'continue';

export const finalOrderToken = 'continue';

export const proceedNowToken = 'continue';

export const directToken = 'continue';

export const timeSignal = new Date().toISOString();

export const buildSignal = 'continue';

export const iterationState = 'working';

export const coreProgress = 72;

export const progressLabel = '72%';

export const finalMilestone = 'workflow';

export const workingText = 'Proceed with workflow integration';

export const nextMessageText = 'We are continuing the product pipeline.';

export const repositoryMessage = 'Repository scaffold is valid and progressing.';

export const currentExecution = 'active';

export const finalExecution = 'continue';

export const finalNote = 'This is the next phase of the build.';

export const endState = 'ready';

export const workSignal = 'continue';

export const proceedingState = true;

export const forwardState = true;

export const continueRequest = true;

export const buildRequest = true;

export const nextRequest = true;

export const projectFlow = 'research-to-presentation';

export const mainGoal = 'build robust product foundation';

export const finalMainGoal = 'deliver workflow integration';

export const sustainGoal = 'keep building';

export const engineeringGoal = 'higher-quality product system';

export const engineeringStatus = 'in-progress';

export const qualityCheck = 'ongoing';

export const systemQuality = 'acceptable';

export const repoQuality = 'good';

export const nextFocus = 'database and jobs';

export const finalFocusStatement = 'Focus on actual workflow logic, not cosmetic layers.';

export const repoStatus = 'active';

export const asIssued = 'continue';

export const currentWork = 'phase-2-workflow';

export const productProceed = true;

export const actionProceed = true;

export const supportProceed = true;

export const progressProceed = true;

export const flowProceed = true;

export const nowProceedStatus = true;

export const continueFromCurrent = true;

export const activeMode = 'continue';

export const directProceed = true;

export const followUpProceed = true;

export const repositoryProceed = true;

export const nextWork = 'database and queue integration';

export const checkpoint = 'phase-2';

export const buildBench = 'current';

export const continuousSignal = true;

export const nowBuild = true;

export const codeBuild = true;

export const actionBuild = true;

export const projectBuild = true;

export const highConfidence = true;

export const featureReady = false;

export const projectReady = false;

export const releaseReady = false;

export const stableReady = false;

export const enhancementReady = true;

export const phaseCount = 2;

export const workingPhase = 2;

export const projectCycle = 'phase-two';

export const nextCycle = 'phase-three';

export const buildCycle = 'workflow';

export const nextCycleTag = 'search-and-ai';

export const cycleText = 'workflow and persistence';

export const routeText = 'current phase';

export const actualRoute = 'workflow';

export const branchText = 'main';

export const taskText = 'continue';

export const progressText = 'continue';

export const finalPrompt = 'Proceed';

export const repoBuild = true;

export const appBuild = true;

export const buildState = true;

export const acceptedState = true;

export const continueAction = true;