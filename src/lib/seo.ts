import type { SeoData } from '@/hooks/useSeo';
import { FILES_API } from '@/pages/Admin';

export async function fetchSeo(page: string): Promise<SeoData | null> {
  try {
    const r = await fetch(`${FILES_API}?route=/seo/public&page=${encodeURIComponent(page)}`, {
      signal: AbortSignal.timeout(5000),
    });
    const d = await r.json();
    return d?.seo && typeof d.seo === 'object' ? (d.seo as SeoData) : null;
  } catch {
    return null;
  }
}

export function seoHead(seo: SeoData | null | undefined) {
  const meta: Array<Record<string, string>> = [];
  const links: Array<{ rel: string; href: string }> = [];
  const scripts: Array<{ type: string; children: string }> = [];
  if (!seo) return { meta, links, scripts };
  if (seo.title) meta.push({ title: seo.title });
  if (seo.description) meta.push({ name: 'description', content: seo.description });
  if (seo.keywords) meta.push({ name: 'keywords', content: seo.keywords });
  if (seo.robots) meta.push({ name: 'robots', content: seo.robots });
  if (seo.og_title) meta.push({ property: 'og:title', content: seo.og_title });
  if (seo.og_description) meta.push({ property: 'og:description', content: seo.og_description });
  if (seo.og_image) meta.push({ property: 'og:image', content: seo.og_image });
  if (seo.canonical) links.push({ rel: 'canonical', href: seo.canonical });
  if (seo.json_ld) {
    try {
      JSON.parse(seo.json_ld);
      scripts.push({ type: 'application/ld+json', children: seo.json_ld });
    } catch {
      /* ignore invalid JSON-LD */
    }
  }
  return { meta, links, scripts };
}
