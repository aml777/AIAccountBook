import { useState } from 'react';
import { Home } from './pages/Home';
import { Records } from './pages/Records';
import { Stats } from './pages/Stats';
import { AIAssistant } from './pages/AIAssistant';
import { Settings } from './pages/Settings';

type TabType = 'home' | 'records' | 'stats' | 'ai' | 'settings';

const TAB_ICONS: Record<TabType, string> = {
  home: '🏠',
  records: '📝',
  stats: '📊',
  ai: '🤖',
  settings: '⚙️'
};

const TAB_LABELS: Record<TabType, string> = {
  home: '首页',
  records: '记录',
  stats: '统计',
  ai: 'AI助手',
  settings: '设置'
};

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'records':
        return <Records />;
      case 'stats':
        return <Stats />;
      case 'ai':
        return <AIAssistant />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </div>

      <nav className="tab-bar">
        {(['home', 'records', 'stats', 'ai', 'settings'] as TabType[]).map(tab => (
          <button
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="tab-icon">{TAB_ICONS[tab]}</span>
            <span className="tab-label">{TAB_LABELS[tab]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
