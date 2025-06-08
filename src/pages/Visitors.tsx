import React, { useState } from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import { UserPlus, Mail, Phone, Calendar, CheckCircle, X, Plus } from 'lucide-react';

const Visitors: React.FC = () => {
  const { visitors, addVisitor, updateVisitor } = useChurchData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: new Date().toISOString().split('T')[0],
    source: 'Walk-in'
  });

  const sources = ['Walk-in', 'Friend Invitation', 'Online', 'Community Event', 'Advertisement', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVisitor({
      ...formData,
      followedUp: false
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      visitDate: new Date().toISOString().split('T')[0],
      source: 'Walk-in'
    });
    setShowAddForm(false);
  };

  const handleFollowUp = (id: string) => {
    updateVisitor(id, { followedUp: true });
  };

  const pendingFollowUps = visitors.filter(v => !v.followedUp);
  const completedFollowUps = visitors.filter(v => v.followedUp);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Visitors</h1>
            <p className="text-gray-600">Track and follow up with church visitors</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Visitor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-blue-600">{visitors.length}</p>
            </div>
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Need Follow-up</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingFollowUps.length}</p>
            </div>
            <Mail className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Followed Up</p>
              <p className="text-2xl font-bold text-green-600">{completedFollowUps.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Add Visitor Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Visitor</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter visitor's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date</label>
              <input
                type="date"
                value={formData.visitDate}
                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">How did they hear about us?</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Visitor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Visitors List */}
      <div className="space-y-6">
        {/* Pending Follow-ups */}
        {pendingFollowUps.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Needs Follow-up</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {pendingFollowUps.map(visitor => (
                <div key={visitor.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{visitor.name}</h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{visitor.email || 'No email provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{visitor.phone || 'No phone provided'}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Visited on {new Date(visitor.visitDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-500">Source: {visitor.source}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollowUp(visitor.id)}
                      className="ml-4 inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Followed Up
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Follow-ups */}
        {completedFollowUps.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Followed Up</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {completedFollowUps.map(visitor => (
                <div key={visitor.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{visitor.name}</h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Visited on {new Date(visitor.visitDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-500">Source: {visitor.source}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Followed Up</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {visitors.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visitors yet</h3>
            <p className="text-gray-500">Start by adding your first visitor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visitors;