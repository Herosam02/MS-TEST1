import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChurchDataProvider } from './context/ChurchDataContext';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
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
import { Loader } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading ChurchOS...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return <AuthForm />;
  }

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
          <Header 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ChurchDataProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;