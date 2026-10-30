import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestUrl } from '@tanstack/react-start/server';

export const getSiteOrigin = createIsomorphicFn()
  .server(() => {
    try {
      return getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin;
    } catch {
      return '';
    }
  })
  .client(() => window.location.origin);
