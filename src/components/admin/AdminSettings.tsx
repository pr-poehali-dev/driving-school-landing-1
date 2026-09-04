import { useState } from 'react';
import { ADMIN_API } from '@/pages/Admin';
import Icon from '@/components/ui/icon';

interface Props { token: string; }

const AdminSettings = ({ token }: Props) => {
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' });
  const [pwStatus, setPwStatus] = useState('');
  const [pwError, setPwError] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwStatus('');
    if (password.newPass !== password.confirm) { setPwError('Пароли не совпадают'); return; }
    if (password.newPass.length < 6) { setPwError('Минимум 6 символов'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}?route=/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ new_password: password.newPass }),
      });
      const d = await res.json();
      if (d.success) { setPwStatus('Пароль изменён'); setPassword({ current: '', newPass: '', confirm: '' }); }
      else setPwError(d.error || 'Ошибка');
    } catch { setPwError('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-md space-y-6">
      {/* Change password */}
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <Icon name="Lock" size={16} className="text-gray-400" />
          Смена пароля
        </h3>
        <form onSubmit={changePassword} className="space-y-3">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Новый пароль</label>
            <input type="password" value={password.newPass} onChange={e => setPassword(p => ({ ...p, newPass: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" required />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Подтвердите пароль</label>
            <input type="password" value={password.confirm} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none" required />
          </div>
          {pwError && <div className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{pwError}</div>}
          {pwStatus && <div className="text-green-400 text-sm bg-green-900/20 rounded-lg px-3 py-2">{pwStatus}</div>}
          <button type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            {loading ? 'Сохранение...' : 'Изменить пароль'}
          </button>
        </form>
      </div>

      {/* API info */}
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <Icon name="Code" size={16} className="text-gray-400" />
          Информация об API
        </h3>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Content API', url: ADMIN_API },
            { label: 'Files/SEO API', url: 'https://functions.poehali.dev/9aa0ff79-0b02-4ee0-9f22-e108f1844285' },
          ].map(({ label, url }) => (
            <div key={label}>
              <div className="text-gray-500 text-xs mb-1">{label}</div>
              <code className="text-green-400 text-xs bg-gray-800 px-3 py-1.5 rounded-lg block break-all">{url}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <Icon name="Link" size={16} className="text-gray-400" />
          Быстрые ссылки
        </h3>
        <div className="space-y-2">
          {[
            { label: 'Сайт', href: '/' },
            { label: 'Политика конфиденциальности', href: '/privacy' },
            { label: 'Согласие на обработку ПД', href: '/agreement' },
            { label: 'Реквизиты', href: '/requisites' },
            { label: 'Политика Cookie', href: '/cookies' },
            { label: 'Пользовательское соглашение', href: '/terms' },
          ].map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between text-gray-400 hover:text-white text-sm py-1.5 border-b border-gray-800 last:border-0 transition-colors">
              <span>{label}</span>
              <Icon name="ExternalLink" size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;