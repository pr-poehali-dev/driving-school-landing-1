import { useState } from 'react';
import { ADMIN_API } from '@/pages/Admin';

interface Props { onLogin: (token: string) => void; }

const AdminLogin = ({ onLogin }: Props) => {
  const [email, setEmail] = useState('admin@vremya-rulit.ru');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Ошибка входа'); return; }
      onLogin(data.token);
    } catch {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white mb-1">Время Рулить</div>
          <div className="text-gray-400 text-sm">Панель управления</div>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 space-y-4 border border-gray-800">
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="admin123"
              className="w-full bg-gray-800 text-white rounded-lg px-3 py-2.5 text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          {error && <div className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p className="text-center text-gray-600 text-xs mt-4">Пароль по умолчанию: admin123</p>
      </div>
    </div>
  );
};

export default AdminLogin;
