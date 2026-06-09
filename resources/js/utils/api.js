/**
 * Shared API utilities and formatters
 * - csrfToken(): retrieves Laravel CSRF token from meta tag
 * - apiFetch(url, options): fetch wrapper with auto-injected headers
 * - formatCurrency(val): IDR currency formatter
 * - formatDate(dateString): YYYY-MM-DD date formatter
 */

export const csrfToken = () =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

/**
 * Wrapper around fetch that auto-injects common headers.
 * Merges user-supplied headers with defaults; user headers win on conflict.
 */
export async function apiFetch(url, options = {}) {
  const { headers: userHeaders = {}, ...rest } = options;

  const defaultHeaders = {
    Accept: 'application/json',
    'X-CSRF-TOKEN': csrfToken(),
  };

  // If a body is present and Content-Type isn't explicitly set, default to JSON
  if (rest.body && !userHeaders['Content-Type'] && !userHeaders['content-type']) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...rest,
    headers: { ...defaultHeaders, ...userHeaders },
  });

  return response;
}

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCurrency = (val) => idrFormatter.format(val ?? 0);

/**
 * Formats a date string into YYYY-MM-DD.
 * Returns "-" for falsy input or the original string on parse failure.
 */
export function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return dateString;
  }
}
