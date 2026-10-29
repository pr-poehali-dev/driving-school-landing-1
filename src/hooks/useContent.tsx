import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ADMIN_API } from '@/pages/Admin';

export type SectionsMap = Record<string, Record<string, unknown>>;

interface ContentCtx {
  sections: SectionsMap;
  loaded: boolean;
}

const Ctx = createContext<ContentCtx>({ sections: {}, loaded: false });

export async function fetchContent(): Promise<SectionsMap | null> {
  try {
    const r = await fetch(`${ADMIN_API}?route=/content/all`, { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    return d?.sections && typeof d.sections === 'object' ? (d.sections as SectionsMap) : null;
  } catch {
    return null;
  }
}

export const ContentProvider = ({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: SectionsMap | null;
}) => {
  const [sections, setSections] = useState<SectionsMap>(initial ?? {});
  const [loaded, setLoaded] = useState(!!initial);

  useEffect(() => {
    if (initial) {
      setSections(initial);
      setLoaded(true);
      return;
    }
    let cancelled = false;
    fetchContent()
      .then((s) => {
        if (s && !cancelled) setSections(s);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [initial]);

  return <Ctx.Provider value={{ sections, loaded }}>{children}</Ctx.Provider>;
};

/**
 * Возвращает данные секции из админки.
 * Если данные ещё не загружены или секция отсутствует — возвращает fallback.
 */
export function useSection<T extends Record<string, unknown>>(name: string, fallback: T): T {
  const { sections } = useContext(Ctx);
  const s = sections[name];
  if (!s || typeof s !== 'object') return fallback;
  return { ...fallback, ...s } as T;
}

export const useContentLoaded = () => useContext(Ctx).loaded;
