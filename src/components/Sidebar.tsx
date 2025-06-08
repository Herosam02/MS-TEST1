import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  Package, 
  MessageSquare, 
  UserPlus, 
  BarChart3, 
  Settings, 
  Brain,
  X,
  Church
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'sms', label: 'SMS Broadcast', icon: MessageSquare },
    { id: 'visitors', label: 'Visitors', icon: UserPlus },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'ai', label: 'AI Features', icon: Brain },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Church className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">JMWO CHURCH MS</h1>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md text-blue-300 hover:text-white hover:bg-blue-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200
                    group hover:bg-blue-700 hover:scale-105 hover:shadow-lg
                    ${activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg scale-105' 
                      : 'text-blue-100 hover:text-white'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-blue-700">
            <div className="bg-blue-700 rounded-lg p-3">
              <p className="text-sm text-blue-100">
                Welcome to the future of church management
              </p>
              <p className="text-xs text-blue-300 mt-1">
                Version 2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;