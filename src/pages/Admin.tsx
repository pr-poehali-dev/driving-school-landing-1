import { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

const ADMIN_API = 'https://functions.poehali.dev/4afa9529-daeb-4b4c-a5f9-57c20cd2480d';
const FILES_API = 'https://functions.poehali.dev/213e2751-f040-4b8d-bbba-79b396aaa2a0';

export { ADMIN_API, FILES_API };

const Admin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) {
      fetch(`${ADMIN_API}/auth/verify`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${saved}` },
      })
        .then(r => r.json())
        .then(d => { if (d.valid) setToken(saved); else localStorage.removeItem('admin_token'); })
        .catch(() => localStorage.removeItem('admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (t: string) => {
    localStorage.setItem('admin_token', t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
};

export default Admin;
