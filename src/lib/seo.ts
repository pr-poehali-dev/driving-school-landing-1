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

const OLD_BANNER = 'https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg';

export function shareMeta(origin: string | undefined, customImage?: string) {
  const base = (origin || '').replace(/\/$/, '');
  const useCustom = !!customImage && customImage !== OLD_BANNER;
  const image = useCustom ? customImage! : `${base}/og-image.jpg`;
  const meta: Array<Record<string, string>> = [
    { property: 'og:image', content: image },
    { name: 'twitter:image', content: image },
  ];
  if (!useCustom) {
    meta.push(
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    );
  }
  if (base) {
    meta.push(
      { property: 'og:video', content: `${base}/video/hero-drive.mp4` },
      { property: 'og:video:secure_url', content: `${base}/video/hero-drive.mp4` },
      { property: 'og:video:type', content: 'video/mp4' },
      { property: 'og:video:width', content: '752' },
      { property: 'og:video:height', content: '560' },
    );
  }
  return meta;
}

export function seoHead(seo: SeoData | null | undefined, origin?: string) {
  const meta: Array<Record<string, string>> = [];
  const links: Array<{ rel: string; href: string }> = [];
  const scripts: Array<{ type: string; children: string }> = [];
  if (origin !== undefined) meta.push(...shareMeta(origin, seo?.og_image));
  if (!seo) return { meta, links, scripts };
  if (seo.title) meta.push({ title: seo.title });
  if (seo.description) meta.push({ name: 'description', content: seo.description });
  if (seo.keywords) meta.push({ name: 'keywords', content: seo.keywords });
  if (seo.robots) meta.push({ name: 'robots', content: seo.robots });
  if (seo.og_title) meta.push({ property: 'og:title', content: seo.og_title });
  if (seo.og_description) meta.push({ property: 'og:description', content: seo.og_description });
  if (seo.og_image && origin === undefined) meta.push({ property: 'og:image', content: seo.og_image });
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
