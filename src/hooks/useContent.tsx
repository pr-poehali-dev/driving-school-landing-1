import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ADMIN_API } from '@/pages/Admin';

type SectionsMap = Record<string, Record<string, unknown>>;

interface ContentCtx {
  sections: SectionsMap;
  loaded: boolean;
}

const Ctx = createContext<ContentCtx>({ sections: {}, loaded: false });

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<SectionsMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${ADMIN_API}?route=/content/all`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.sections) setSections(d.sections);
      })
      .catch(() => {
        /* остаются дефолты */
      })
      .finally(() => setLoaded(true));
  }, []);

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
