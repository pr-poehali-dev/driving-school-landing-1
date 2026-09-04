import { useEffect } from 'react';
import { FILES_API } from '@/pages/Admin';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical?: string;
  robots?: string;
  h1?: string;
  json_ld?: string;
  favicon?: string;
}

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => {
      if (k !== 'content') el!.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  if (attrs.content !== undefined) el.setAttribute('content', attrs.content);
};

const upsertLink = (rel: string, href: string, extra: Record<string, string> = {}) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
};

const upsertScript = (id: string, content: string) => {
  let el = document.head.querySelector(`script[data-id="${id}"]`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-id', id);
    document.head.appendChild(el);
  }
  el.textContent = content;
};

export const applySeo = (seo: SeoData) => {
  if (seo.title) document.title = seo.title;
  if (seo.description) upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
  if (seo.keywords) upsertMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords });
  if (seo.robots) upsertMeta('meta[name="robots"]', { name: 'robots', content: seo.robots });

  if (seo.og_title) upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.og_title });
  if (seo.og_description) upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.og_description });
  if (seo.og_image) upsertMeta('meta[property="og:image"]', { property: 'og:image', content: seo.og_image });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });

  if (seo.canonical) upsertLink('canonical', seo.canonical);
  if (seo.favicon) upsertLink('icon', seo.favicon);

  if (seo.json_ld) {
    try {
      JSON.parse(seo.json_ld);
      upsertScript('seo-json-ld', seo.json_ld);
    } catch {
      /* ignore invalid JSON-LD */
    }
  }
};

export const useSeo = (page: string) => {
  useEffect(() => {
    let cancelled = false;
    fetch(`${FILES_API}?route=/seo/public&page=${encodeURIComponent(page)}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.seo) applySeo(d.seo);
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      cancelled = true;
    };
  }, [page]);
};

export default useSeo;
