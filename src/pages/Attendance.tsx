import React, { useState } from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import { Calendar, Users, Check, X, Plus } from 'lucide-react';

const Attendance: React.FC = () => {
  const { members, attendance, addAttendance } = useChurchData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedService, setSelectedService] = useState('Sunday Morning');
  const [showAddForm, setShowAddForm] = useState(false);

  const services = ['Sunday Morning', 'Sunday Evening', 'Wednesday Evening', 'Bible Study'];

  const getAttendanceForDate = (date: string, service: string) => {
    return attendance.filter(a => a.date === date && a.service === service);
  };

  const currentAttendance = getAttendanceForDate(selectedDate, selectedService);
  const attendanceRate = currentAttendance.length > 0 
    ? (currentAttendance.filter(a => a.present).length / currentAttendance.length) * 100 
    : 0;

  const handleMarkAttendance = (memberId: string, present: boolean) => {
    // Remove existing record if any
    const existingIndex = currentAttendance.findIndex(a => a.memberId === memberId);
    
    // Add new attendance record
    addAttendance({
      memberId,
      date: selectedDate,
      service: selectedService,
      present
    });
  };

  const getMemberAttendance = (memberId: string) => {
    const record = currentAttendance.find(a => a.memberId === memberId);
    return record ? record.present : null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance</h1>
            <p className="text-gray-600">Track member attendance for services and events</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5 mr-2" />
            Quick Mark
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Present</p>
              <p className="text-2xl font-bold text-green-600">
                {currentAttendance.filter(a => a.present).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Absent</p>
              <p className="text-2xl font-bold text-red-600">
                {currentAttendance.filter(a => !a.present).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {attendanceRate.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedService} - {new Date(selectedDate).toLocaleDateString()}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {members.map(member => {
            const attendanceStatus = getMemberAttendance(member.id);
            
            return (
              <div key={member.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMarkAttendance(member.id, true)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        attendanceStatus === true
                          ? 'bg-green-100 text-green-800 border-2 border-green-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(member.id, false)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        attendanceStatus === false
                          ? 'bg-red-100 text-red-800 border-2 border-red-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-500">Add members to start tracking attendance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;