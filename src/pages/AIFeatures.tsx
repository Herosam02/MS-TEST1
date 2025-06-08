import React from 'react';
import { Brain, MessageSquare, TrendingUp, Users, Lightbulb, BarChart3 } from 'lucide-react';

const AIFeatures: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Smart SMS Suggestions',
      description: 'AI-powered message templates and optimal send times',
      status: 'Active',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast attendance and giving patterns',
      status: 'Active',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Member Insights',
      description: 'Identify at-risk members and engagement opportunities',
      status: 'Beta',
      color: 'purple'
    },
    {
      icon: Lightbulb,
      title: 'Event Recommendations',
      description: 'Suggest optimal event timing and content',
      status: 'Coming Soon',
      color: 'yellow'
    },
    {
      icon: BarChart3,
      title: 'Financial Forecasting',
      description: 'Predict future giving and budget planning',
      status: 'Beta',
      color: 'red'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Beta': return 'bg-blue-100 text-blue-800';
      case 'Coming Soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Features</h1>
            <p className="text-gray-600">Intelligent insights and automation for your church</p>
          </div>
        </div>
      </div>

      {/* AI Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Assistant Status</h3>
            <p className="text-gray-600">Your AI assistant is actively learning and improving</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <p className="text-sm text-gray-500">Last updated: 2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-full ${getIconColor(feature.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feature.status)}`}>
                  {feature.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                {feature.status === 'Active' ? 'Configure' : feature.status === 'Beta' ? 'Join Beta' : 'Learn More'}
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Attendance Prediction</p>
                  <p className="text-sm text-blue-700 mt-1">Expected 15% increase in Sunday attendance based on recent trends</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Member Engagement</p>
                  <p className="text-sm text-green-700 mt-1">3 members may benefit from personal outreach this week</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">Communication Optimization</p>
                  <p className="text-sm text-purple-700 mt-1">Best time to send SMS: Tuesday 2-4 PM (87% open rate)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-900">Event Planning</p>
                  <p className="text-sm text-yellow-700 mt-1">Consider hosting a community event in March for maximum impact</p>
                </div>
                <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-red-900">Budget Alert</p>
                  <p className="text-sm text-red-700 mt-1">Utilities spending trending 20% above budget this quarter</p>
                </div>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Review
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-900">Growth Opportunity</p>
                  <p className="text-sm text-indigo-700 mt-1">Youth program expansion could increase engagement by 25%</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insight Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="daily">Daily</option>
              <option value="weekly" selected>Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prediction Accuracy</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="conservative">Conservative</option>
              <option value="balanced" selected>Balanced</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-apply Recommendations</p>
                <p className="text-sm text-gray-500">Automatically implement low-risk AI suggestions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;