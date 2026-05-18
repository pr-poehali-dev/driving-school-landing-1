import { useState, useEffect } from 'react';
import { ADMIN_API } from '@/pages/Admin';
import Icon from '@/components/ui/icon';

interface Props { token: string; }

const SECTIONS = [
  { id: 'hero', label: 'Главный экран' },
  { id: 'header', label: 'Шапка' },
  { id: 'footer', label: 'Подвал' },
  { id: 'pricing', label: 'Цены' },
  { id: 'advantages', label: 'Преимущества' },
  { id: 'pain_points', label: 'Боли клиентов' },
  { id: 'triggers', label: 'Триггеры' },
  { id: 'instructors', label: 'Инструкторы' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'faq', label: 'FAQ' },
  { id: 'map', label: 'Контакты и карта' },
  { id: 'price_comparison', label: 'Сравнение цен' },
  { id: 'cookies_page', label: 'Политика Cookie' },
  { id: 'terms_page', label: 'Польз. соглашение' },
  { id: 'documents', label: 'Документы' },
];

const Field = ({ label, value, onChange, multiline = false, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) => (
  <div>
    <label className="text-gray-400 text-xs mb-1 block">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none resize-y"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
      />
    )}
  </div>
);

const AdminContentEditor = ({ token }: Props) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadSection = async (section: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/content/section/${section}`);
      const d = await res.json();
      setData(d.data || {});
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { loadSection(activeSection); }, [activeSection]);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`${ADMIN_API}/content/section/${activeSection}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const reset = async () => {
    if (!confirm('Сбросить к исходным данным?')) return;
    setSaving(true);
    try {
      const res = await fetch(`${ADMIN_API}/content/section/${activeSection}/reset`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const d = await res.json();
      setData(d.data || {});
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const setField = (key: string, value: unknown) => setData(prev => ({ ...prev, [key]: value }));

  const renderListEditor = (key: string, items: Record<string, unknown>[]) => (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="bg-gray-800 rounded-xl p-4 space-y-2.5 relative">
          <div className="text-gray-500 text-xs mb-2">#{idx + 1}</div>
          {Object.entries(item).filter(([k]) => k !== 'id').map(([k, v]) => (
            <Field
              key={k}
              label={k}
              value={String(v ?? '')}
              onChange={val => {
                const newItems = [...items];
                newItems[idx] = { ...item, [k]: val };
                setField(key, newItems);
              }}
              multiline={k === 'answer' || k === 'text' || k === 'description' || k === 'quote'}
            />
          ))}
          <div className="flex gap-2 pt-1">
            {idx > 0 && (
              <button onClick={() => {
                const arr = [...items];
                [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                setField(key, arr);
              }} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                <Icon name="ArrowUp" size={12} /> Вверх
              </button>
            )}
            <button onClick={() => {
              if (confirm('Удалить?')) setField(key, items.filter((_, i) => i !== idx));
            }} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 ml-auto">
              <Icon name="Trash2" size={12} /> Удалить
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const sample = items[0] ? Object.fromEntries(Object.keys(items[0]).map(k => [k, k === 'id' ? Date.now() : ''])) : { id: Date.now(), title: '', description: '' };
          setField(key, [...items, sample]);
        }}
        className="w-full border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-xl py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
      >
        <Icon name="Plus" size={14} /> Добавить
      </button>
    </div>
  );

  const renderStringListEditor = (key: string, items: string[]) => (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          <input
            value={item}
            onChange={e => {
              const arr = [...items];
              arr[idx] = e.target.value;
              setField(key, arr);
            }}
            className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <button onClick={() => setField(key, items.filter((_, i) => i !== idx))}
            className="text-gray-500 hover:text-red-400 p-2">
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => setField(key, [...items, ''])}
        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1.5"
      >
        <Icon name="Plus" size={14} /> Добавить строку
      </button>
    </div>
  );

  const renderFields = () => {
    if (loading) return <div className="text-gray-500 text-sm py-8 text-center">Загрузка...</div>;

    return Object.entries(data).filter(([k]) => !k.startsWith('_')).map(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        return (
          <div key={key}>
            <label className="text-gray-300 text-sm font-medium mb-3 block capitalize">{key.replace(/_/g, ' ')}</label>
            {renderListEditor(key, value as Record<string, unknown>[])}
          </div>
        );
      }
      if (Array.isArray(value)) {
        return (
          <div key={key}>
            <label className="text-gray-300 text-sm font-medium mb-3 block capitalize">{key.replace(/_/g, ' ')}</label>
            {renderStringListEditor(key, value as string[])}
          </div>
        );
      }
      return (
        <Field
          key={key}
          label={key.replace(/_/g, ' ')}
          value={String(value ?? '')}
          onChange={val => setField(key, val)}
          multiline={key.includes('description') || key.includes('quote') || key.includes('includes') || key.includes('subheading')}
        />
      );
    });
  };

  return (
    <div className="flex gap-6">
      {/* Section list */}
      <div className="w-48 shrink-0 space-y-1">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              activeSection === s.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 max-w-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-medium">
            {SECTIONS.find(s => s.id === activeSection)?.label}
          </h2>
          <div className="flex gap-2">
            <button onClick={reset} className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">
              Сбросить
            </button>
            <button
              onClick={save}
              disabled={saving}
              className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
              }`}
            >
              {saved ? <><Icon name="Check" size={14} /> Сохранено</> : saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>

        <div className="space-y-4 bg-gray-900 rounded-2xl p-5 border border-gray-800">
          {renderFields()}
        </div>
      </div>
    </div>
  );
};

export default AdminContentEditor;