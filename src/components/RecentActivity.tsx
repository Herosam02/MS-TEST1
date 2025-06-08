import React from 'react';
import { Activity, UserPlus, DollarSign, Calendar, MessageSquare } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'member',
      message: 'Michael Davis joined the church',
      time: '2 hours ago',
      icon: UserPlus,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      type: 'finance',
      message: 'Sunday offering of $5,000 received',
      time: '1 day ago',
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 3,
      type: 'attendance',
      message: 'Sunday service attendance: 85 members',
      time: '2 days ago',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 4,
      type: 'sms',
      message: 'Weekly newsletter sent to 120 members',
      time: '3 days ago',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 5,
      type: 'visitor',
      message: 'Emma Wilson visited for the first time',
      time: '4 days ago',
      icon: UserPlus,
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="p-2 bg-blue-100 rounded-full">
          <Activity className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`flex-shrink-0 p-2 rounded-full ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;