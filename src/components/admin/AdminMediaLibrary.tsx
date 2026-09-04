import { useState, useEffect, useRef } from 'react';
import { FILES_API } from '@/pages/Admin';
import Icon from '@/components/ui/icon';

interface Props { token: string; }

interface MediaFile {
  id: number; key: string; filename: string; folder: string;
  mime_type: string; size_bytes: number; cdn_url: string; alt: string;
  tags?: string[]; created_at: number;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
};

const AdminMediaLibrary = ({ token }: Props) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [copied, setCopied] = useState(false);
  const [editAlt, setEditAlt] = useState('');
  const [editTags, setEditTags] = useState('');
  const [savingMeta, setSavingMeta] = useState(false);
  const [savedMeta, setSavedMeta] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const load = async (p = 1, q = search) => {
    const params = new URLSearchParams({ page: String(p), per_page: '20', ...(q ? { search: q } : {}) });
    try {
      const res = await fetch(`${FILES_API}?route=/media/list&${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const d = await res.json();
      setFiles(d.files || []);
      setTotal(d.total || 0);
      setPages(d.pages || 1);
    } catch { /* ignore */ }
  };

  useEffect(() => { load(1, search); }, [search]);

  useEffect(() => {
    if (selected) {
      setEditAlt(selected.alt || '');
      setEditTags((selected.tags || []).join(', '));
    }
  }, [selected?.id]);

  const readFileBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => reject(new Error('read error'));
      r.readAsDataURL(f);
    });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    const arr = Array.from(list);
    setUploading(true);
    let ok = 0, fail = 0;
    for (let i = 0; i < arr.length; i++) {
      const f = arr[i];
      setUploadProgress(`Загрузка ${i + 1} из ${arr.length}: ${f.name}`);
      try {
        const base64 = await readFileBase64(f);
        const res = await fetch(`${FILES_API}?route=/media/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ file: base64, mime_type: f.type, filename: f.name, folder: 'uploads' }),
        });
        const d = await res.json();
        if (d.success) ok++; else fail++;
      } catch { fail++; }
    }
    setUploadProgress(`Готово: ${ok} загружено${fail ? `, ${fail} с ошибкой` : ''}`);
    setUploading(false);
    if (fileInput.current) fileInput.current.value = '';
    load(1);
    setTimeout(() => setUploadProgress(''), 3500);
  };

  const deleteFile = async (file: MediaFile) => {
    if (!confirm(`Удалить "${file.filename}"? Файл удалится из S3.`)) return;
    await fetch(`${FILES_API}?route=/media/file`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ key: file.key }),
    });
    if (selected?.key === file.key) setSelected(null);
    load(page);
  };

  const saveMeta = async () => {
    if (!selected) return;
    setSavingMeta(true);
    try {
      const tags = editTags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(`${FILES_API}?route=/media/file`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key: selected.key, alt: editAlt, tags }),
      });
      const d = await res.json();
      if (d.success) {
        setSelected({ ...selected, alt: editAlt, tags });
        setFiles(prev => prev.map(f => f.key === selected.key ? { ...f, alt: editAlt, tags } : f));
        setSavedMeta(true);
        setTimeout(() => setSavedMeta(false), 2000);
      }
    } catch { /* ignore */ }
    finally { setSavingMeta(false); }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isImage = (mime: string) => mime.startsWith('image/') && mime !== 'image/svg+xml';

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по имени, alt, тегам..."
            className="w-full bg-gray-900 text-white rounded-lg pl-9 pr-3 py-2 text-sm border border-gray-800 focus:border-blue-500 focus:outline-none" />
        </div>
        <input type="file" ref={fileInput} onChange={handleFileSelect} className="hidden" multiple
          accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/avif,application/pdf" />
        <button
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Icon name="Upload" size={14} />
          {uploading ? 'Загрузка...' : 'Загрузить файлы'}
        </button>
        <span className="text-gray-500 text-sm">{total} файлов</span>
      </div>

      {uploadProgress && (
        <div className={`mb-4 text-sm px-4 py-2 rounded-lg ${
          uploading ? 'bg-blue-900/20 text-blue-300' : 'bg-green-900/20 text-green-400'
        }`}>{uploadProgress}</div>
      )}

      <div className="flex gap-5">
        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {files.map(file => (
              <div
                key={file.id}
                onClick={() => setSelected(file)}
                className={`group relative bg-gray-900 rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  selected?.id === file.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="aspect-square bg-gray-800 flex items-center justify-center">
                  {isImage(file.mime_type) ? (
                    <img src={file.cdn_url} alt={file.alt || file.filename}
                      className="w-full h-full object-cover" loading="lazy" />
                  ) : file.mime_type === 'application/pdf' ? (
                    <Icon name="FileText" size={32} className="text-red-400" />
                  ) : (
                    <Icon name="File" size={32} className="text-gray-500" />
                  )}
                </div>
                <div className="p-2">
                  <div className="text-gray-300 text-xs truncate">{file.filename}</div>
                  <div className="text-gray-600 text-xs">{formatSize(file.size_bytes)}</div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); copyUrl(file.cdn_url); }}
                  className="absolute top-1.5 left-1.5 bg-gray-900/80 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Копировать ссылку"
                >
                  <Icon name="Copy" size={10} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); deleteFile(file); }}
                  className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Удалить"
                >
                  <Icon name="X" size={10} />
                </button>
              </div>
            ))}
          </div>

          {files.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <Icon name="Image" size={40} className="mx-auto mb-3 opacity-30" />
              <div className="text-sm">Файлов нет. Загрузите первый.</div>
            </div>
          )}

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-5">
              <button onClick={() => { setPage(p => Math.max(1, p - 1)); load(Math.max(1, page - 1)); }}
                disabled={page === 1}
                className="text-gray-400 hover:text-white disabled:opacity-30 p-1">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <span className="text-gray-400 text-sm">{page} / {pages}</span>
              <button onClick={() => { setPage(p => Math.min(pages, p + 1)); load(Math.min(pages, page + 1)); }}
                disabled={page === pages}
                className="text-gray-400 hover:text-white disabled:opacity-30 p-1">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-72 shrink-0 bg-gray-900 rounded-2xl border border-gray-800 p-4 space-y-4 self-start sticky top-0">
            <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden">
              {isImage(selected.mime_type) ? (
                <img src={selected.cdn_url} alt={selected.alt} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="FileText" size={48} className="text-red-400" />
                </div>
              )}
            </div>
            <div className="space-y-2 text-xs text-gray-400">
              <div><span className="text-gray-600">Файл:</span> <span className="text-gray-300 break-all">{selected.filename}</span></div>
              <div><span className="text-gray-600">Тип:</span> {selected.mime_type}</div>
              <div><span className="text-gray-600">Размер:</span> {formatSize(selected.size_bytes)}</div>
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">CDN URL</label>
              <div className="flex gap-1.5">
                <input readOnly value={selected.cdn_url}
                  className="flex-1 bg-gray-800 text-gray-300 rounded-lg px-2 py-1.5 text-xs border border-gray-700 focus:outline-none min-w-0" />
                <button onClick={() => copyUrl(selected.cdn_url)}
                  className={`p-1.5 rounded-lg transition-colors shrink-0 ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                  <Icon name={copied ? 'Check' : 'Copy'} size={12} />
                </button>
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Alt-текст</label>
              <input value={editAlt} onChange={e => setEditAlt(e.target.value)}
                placeholder="Что изображено..."
                className="w-full bg-gray-800 text-gray-200 rounded-lg px-2 py-1.5 text-xs border border-gray-700 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Теги (через запятую)</label>
              <input value={editTags} onChange={e => setEditTags(e.target.value)}
                placeholder="инструктор, авто, ..."
                className="w-full bg-gray-800 text-gray-200 rounded-lg px-2 py-1.5 text-xs border border-gray-700 focus:border-blue-500 focus:outline-none" />
            </div>
            <button onClick={saveMeta} disabled={savingMeta}
              className={`w-full rounded-lg py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                savedMeta ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
              }`}>
              {savedMeta ? <><Icon name="Check" size={12} /> Сохранено</> : savingMeta ? 'Сохранение...' : 'Сохранить данные'}
            </button>
            <button onClick={() => deleteFile(selected)}
              className="w-full text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-700 rounded-lg py-1.5 text-xs transition-colors flex items-center justify-center gap-1.5">
              <Icon name="Trash2" size={12} /> Удалить файл
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMediaLibrary;
