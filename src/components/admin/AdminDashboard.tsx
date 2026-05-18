import { useState } from 'react';
import Icon from '@/components/ui/icon';
import AdminContentEditor from './AdminContentEditor';
import AdminSeoEditor from './AdminSeoEditor';
import AdminMediaLibrary from './AdminMediaLibrary';
import AdminSettings from './AdminSettings';

interface Props { token: string; onLogout: () => void; }

const TABS = [
  { id: 'content', label: 'Контент', icon: 'LayoutDashboard' },
  { id: 'seo', label: 'SEO', icon: 'Search' },
  { id: 'media', label: 'Медиатека', icon: 'Image' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

const AdminDashboard = ({ token, onLogout }: Props) => {
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-56' : 'w-14'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-200 shrink-0`}>
        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
            <Icon name="Menu" size={18} />
          </button>
          {sidebarOpen && <span className="text-white font-semibold text-sm truncate">Время Рулить</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon name={tab.icon as 'Menu'} size={16} />
              {sidebarOpen && <span className="truncate">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
          >
            <Icon name="LogOut" size={16} />
            {sidebarOpen && <span>Выйти</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between z-10">
          <h1 className="text-white font-medium text-sm">
            {TABS.find(t => t.id === activeTab)?.label}
          </h1>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5">
            <Icon name="ExternalLink" size={13} />
            Открыть сайт
          </a>
        </div>

        <div className="p-6">
          {activeTab === 'content' && <AdminContentEditor token={token} />}
          {activeTab === 'seo' && <AdminSeoEditor token={token} />}
          {activeTab === 'media' && <AdminMediaLibrary token={token} />}
          {activeTab === 'settings' && <AdminSettings token={token} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
