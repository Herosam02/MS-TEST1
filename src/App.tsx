import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Attendance from './pages/Attendance';
import Finance from './pages/Finance';
import Equipment from './pages/Equipment';
import SMS from './pages/SMS';
import Visitors from './pages/Visitors';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import AIFeatures from './pages/AIFeatures';
import { ChurchDataProvider } from './context/ChurchDataContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />;
      case 'attendance':
        return <Attendance />;
      case 'finance':
        return <Finance />;
      case 'equipment':
        return <Equipment />;
      case 'sms':
        return <SMS />;
      case 'visitors':
        return <Visitors />;
      case 'reports':
        return <Reports />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      case 'ai':
        return <AIFeatures />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ChurchDataProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <h1 className="text-xl font-semibold text-gray-900">Church Manager</h1>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ChurchDataProvider>
  );
}

export default App;