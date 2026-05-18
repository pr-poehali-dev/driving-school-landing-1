import { useState, useEffect } from 'react';
import { FILES_API } from '@/pages/Admin';
import Icon from '@/components/ui/icon';

interface Props { token: string; }

const PAGES = ['/', '/privacy', '/agreement', '/requisites', '/cookies', '/terms'];

interface SeoData {
  title?: string; description?: string; keywords?: string;
  og_title?: string; og_description?: string; og_image?: string;
  canonical?: string; robots?: string; h1?: string; json_ld?: string;
  favicon?: string;
}

interface AuditItem { type: string; field: string; message: string; }
interface RedirectItem { id: number; from: string; to: string; type: number; active: boolean; }

const ScoreBadge = ({ score }: { score: number }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
    score >= 80 ? 'bg-green-900/50 text-green-400' :
    score >= 50 ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'
  }`}>{score}/100</span>
);

const AdminSeoEditor = ({ token }: Props) => {
  const [tab, setTab] = useState<'meta' | 'redirects' | 'robots' | 'sitemap' | 'audit'>('meta');
  const [activePage, setActivePage] = useState('/');
  const [seo, setSeo] = useState<SeoData>({});
  const [audit, setAudit] = useState<AuditItem[]>([]);
  const [auditScore, setAuditScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [newRedirect, setNewRedirect] = useState({ from: '', to: '', type: 301 });

  const [robotsContent, setRobotsContent] = useState('');
  const [sitemapPages, setSitemapPages] = useState<{ loc: string; priority: string; changefreq: string }[]>([]);

  const [allAudit, setAllAudit] = useState<{ page: string; score: number; issues: string[] }[]>([]);

  const loadMeta = async (page: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${FILES_API}/seo/meta?page=${encodeURIComponent(page)}`);
      const d = await res.json();
      setSeo(d.seo || {});
      setAudit(d.audit || []);
      setAuditScore(d.audit?.reduce((acc: number, a: AuditItem) => acc + (a.type === 'ok' ? 1 : 0), 0) * 25 || 0);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const saveMeta = async () => {
    setSaving(true);
    try {
      await fetch(`${FILES_API}/seo/meta?page=${encodeURIComponent(activePage)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(seo),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      loadMeta(activePage);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const loadRedirects = async () => {
    const res = await fetch(`${FILES_API}/seo/redirects`);
    const d = await res.json();
    setRedirects(d.items || []);
  };

  const addRedirect = async () => {
    if (!newRedirect.from || !newRedirect.to) return;
    await fetch(`${FILES_API}/seo/redirects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newRedirect),
    });
    setNewRedirect({ from: '', to: '', type: 301 });
    loadRedirects();
  };

  const deleteRedirect = async (id: number) => {
    await fetch(`${FILES_API}/seo/redirects?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    loadRedirects();
  };

  const loadRobots = async () => {
    const res = await fetch(`${FILES_API}/seo/robots`);
    const d = await res.json();
    setRobotsContent(d.content || '');
  };

  const saveRobots = async () => {
    setSaving(true);
    await fetch(`${FILES_API}/seo/robots`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ content: robotsContent }),
    });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const loadSitemap = async () => {
    const res = await fetch(`${FILES_API}/seo/sitemap`);
    const d = await res.json();
    setSitemapPages(d.pages || []);
  };

  const saveSitemap = async () => {
    setSaving(true);
    await fetch(`${FILES_API}/seo/sitemap`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ pages: sitemapPages }),
    });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const loadAudit = async () => {
    const res = await fetch(`${FILES_API}/seo/audit`);
    const d = await res.json();
    setAllAudit(d.pages || []);
  };

  useEffect(() => {
    if (tab === 'meta') loadMeta(activePage);
    if (tab === 'redirects') loadRedirects();
    if (tab === 'robots') loadRobots();
    if (tab === 'sitemap') loadSitemap();
    if (tab === 'audit') loadAudit();
  }, [tab, activePage]);

  const TABS = [
    { id: 'meta', label: 'Метатеги' },
    { id: 'redirects', label: 'Редиректы' },
    { id: 'robots', label: 'robots.txt' },
    { id: 'sitemap', label: 'Sitemap' },
    { id: 'audit', label: 'Аудит' },
  ] as const;

  const SaveBtn = () => (
    <button onClick={tab === 'meta' ? saveMeta : tab === 'robots' ? saveRobots : saveSitemap}
      disabled={saving}
      className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
        saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
      }`}>
      {saved ? <><Icon name="Check" size={14} /> Сохранено</> : saving ? 'Сохранение...' : 'Сохранить'}
    </button>
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-900 p-1 rounded-xl w-fit border border-gray-800">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
              tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* META */}
      {tab === 'meta' && (
        <div className="flex gap-6">
          <div className="w-36 shrink-0 space-y-1">
            {PAGES.map(p => (
              <button key={p} onClick={() => setActivePage(p)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activePage === p ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}>
                {p === '/' ? 'Главная' : p}
              </button>
            ))}
          </div>
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{activePage}</span>
                {audit.length > 0 && <ScoreBadge score={Math.round(audit.filter(a => a.type === 'ok').length / audit.length * 100)} />}
              </div>
              <SaveBtn />
            </div>

            {audit.length > 0 && (
              <div className="mb-4 space-y-1.5">
                {audit.map((a, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                    a.type === 'ok' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'
                  }`}>
                    <Icon name={a.type === 'ok' ? 'CheckCircle' : 'AlertCircle'} size={12} />
                    {a.message}
                  </div>
                ))}
              </div>
            )}

            {loading ? <div className="text-gray-500 text-sm py-8 text-center">Загрузка...</div> : (
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 space-y-4">
                {([
                  ['title', 'Title (30-70 символов)'],
                  ['description', 'Description (100-160 символов)'],
                  ['keywords', 'Keywords'],
                  ['og_title', 'OG Title'],
                  ['og_description', 'OG Description'],
                  ['og_image', 'OG Image URL'],
                  ['canonical', 'Canonical URL'],
                  ['favicon', 'Favicon URL (например /favicon.ico)'],
                  ['robots', 'Robots'],
                  ['h1', 'H1 заголовок'],
                ] as [keyof SeoData, string][]).map(([key, label]) => (
                  <div key={key}>
                    <label className="text-gray-400 text-xs mb-1 block">{label}</label>
                    {key === 'description' || key === 'og_description' ? (
                      <textarea value={seo[key] || ''} onChange={e => setSeo(p => ({ ...p, [key]: e.target.value }))}
                        rows={3}
                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none resize-y" />
                    ) : (
                      <input value={seo[key] || ''} onChange={e => setSeo(p => ({ ...p, [key]: e.target.value }))}
                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
                    )}
                    {(key === 'title' || key === 'description') && (
                      <div className="text-gray-600 text-xs mt-1">{(seo[key] || '').length} симв.</div>
                    )}
                  </div>
                ))}
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">JSON-LD (структурированные данные)</label>
                  <textarea value={seo.json_ld || ''} onChange={e => setSeo(p => ({ ...p, json_ld: e.target.value }))}
                    rows={6}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none resize-y font-mono text-xs" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REDIRECTS */}
      {tab === 'redirects' && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 space-y-3">
            <h3 className="text-white font-medium text-sm">Добавить редирект</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Откуда</label>
                <input value={newRedirect.from} onChange={e => setNewRedirect(p => ({ ...p, from: e.target.value }))}
                  placeholder="/old-page"
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Куда</label>
                <input value={newRedirect.to} onChange={e => setNewRedirect(p => ({ ...p, to: e.target.value }))}
                  placeholder="/new-page"
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select value={newRedirect.type} onChange={e => setNewRedirect(p => ({ ...p, type: Number(e.target.value) }))}
                className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none">
                <option value={301}>301 — Постоянный</option>
                <option value={302}>302 — Временный</option>
              </select>
              <button onClick={addRedirect} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Добавить
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {redirects.length === 0 && <div className="text-gray-500 text-sm text-center py-8">Редиректов нет</div>}
            {redirects.map(r => (
              <div key={r.id} className="bg-gray-900 rounded-xl px-4 py-3 border border-gray-800 flex items-center gap-3">
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded font-mono">{r.type}</span>
                <span className="text-gray-300 text-sm font-mono">{r.from}</span>
                <Icon name="ArrowRight" size={14} className="text-gray-600 shrink-0" />
                <span className="text-blue-400 text-sm font-mono flex-1">{r.to}</span>
                <button onClick={() => deleteRedirect(r.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROBOTS */}
      {tab === 'robots' && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">robots.txt</span>
            <SaveBtn />
          </div>
          <textarea value={robotsContent} onChange={e => setRobotsContent(e.target.value)}
            rows={16}
            className="w-full bg-gray-900 text-green-400 rounded-2xl p-5 text-sm border border-gray-800 focus:border-blue-500 focus:outline-none font-mono resize-y" />
        </div>
      )}

      {/* SITEMAP */}
      {tab === 'sitemap' && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">sitemap.xml</span>
            <SaveBtn />
          </div>
          <div className="space-y-3">
            {sitemapPages.map((p, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 grid grid-cols-3 gap-3">
                <div className="col-span-3">
                  <label className="text-gray-400 text-xs mb-1 block">URL</label>
                  <input value={p.loc} onChange={e => {
                    const arr = [...sitemapPages]; arr[i] = { ...p, loc: e.target.value }; setSitemapPages(arr);
                  }} className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Приоритет</label>
                  <select value={p.priority} onChange={e => {
                    const arr = [...sitemapPages]; arr[i] = { ...p, priority: e.target.value }; setSitemapPages(arr);
                  }} className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700">
                    {['1.0','0.9','0.8','0.7','0.5','0.3','0.1'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Частота</label>
                  <select value={p.changefreq} onChange={e => {
                    const arr = [...sitemapPages]; arr[i] = { ...p, changefreq: e.target.value }; setSitemapPages(arr);
                  }} className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700">
                    {['always','hourly','daily','weekly','monthly','yearly','never'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={() => setSitemapPages(sitemapPages.filter((_, j) => j !== i))}
                    className="text-gray-500 hover:text-red-400 p-2 transition-colors">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => setSitemapPages([...sitemapPages, { loc: 'https://vremya-rulit.ru/', priority: '0.5', changefreq: 'monthly' }])}
              className="w-full border border-dashed border-gray-700 text-gray-400 hover:text-white rounded-xl py-2.5 text-sm flex items-center justify-center gap-2">
              <Icon name="Plus" size={14} /> Добавить страницу
            </button>
          </div>
        </div>
      )}

      {/* AUDIT */}
      {tab === 'audit' && (
        <div className="max-w-2xl space-y-3">
          {allAudit.length === 0 && <div className="text-gray-500 text-sm text-center py-8">Загрузка...</div>}
          {allAudit.map(p => (
            <div key={p.page} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{p.page}</span>
                <ScoreBadge score={p.score} />
              </div>
              {p.issues.length === 0
                ? <div className="text-green-400 text-xs">Всё отлично</div>
                : <ul className="space-y-1">{p.issues.map((issue, i) => (
                    <li key={i} className="text-yellow-400 text-xs flex items-center gap-1.5">
                      <Icon name="AlertCircle" size={11} /> {issue}
                    </li>
                  ))}</ul>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSeoEditor;