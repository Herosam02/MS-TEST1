import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Generate and view detailed church reports</p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="h-5 w-5 mr-2" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Updated daily</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Membership Reports</h3>
          <p className="text-gray-600 text-sm mb-4">Member growth, demographics, and engagement statistics</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Generate Report →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Updated weekly</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h3>
          <p className="text-gray-600 text-sm mb-4">Income, expenses, offerings, and budget analysis</p>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm">
            Generate Report →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Updated after services</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Reports</h3>
          <p className="text-gray-600 text-sm mb-4">Service attendance trends and member participation</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
            Generate Report →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Updated monthly</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Analytics</h3>
          <p className="text-gray-600 text-sm mb-4">Church growth metrics and performance indicators</p>
          <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
            Generate Report →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm text-gray-500">Custom range</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Reports</h3>
          <p className="text-gray-600 text-sm mb-4">Create custom reports with specific criteria</p>
          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
            Create Custom →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-sm text-gray-500">Scheduled</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Reports</h3>
          <p className="text-gray-600 text-sm mb-4">Special events, activities, and program analytics</p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            Generate Report →
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">Monthly Financial Report - January 2024</h4>
                <p className="text-sm text-gray-500 mt-1">Generated on January 31, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Ready</span>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">Attendance Analysis - Q4 2023</h4>
                <p className="text-sm text-gray-500 mt-1">Generated on January 15, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Ready</span>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">Member Growth Report - 2023</h4>
                <p className="text-sm text-gray-500 mt-1">Generated on January 5, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Processing</span>
                <button className="p-2 text-gray-300 cursor-not-allowed">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;