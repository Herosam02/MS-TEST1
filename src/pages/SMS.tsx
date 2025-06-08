import React, { useState } from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import { MessageSquare, Send, Users, Clock, Plus, CheckCircle } from 'lucide-react';

const SMS: React.FC = () => {
  const { smsMessages, addSMSMessage, updateSMSMessage, members } = useChurchData();
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('all');
  const [scheduled, setScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');

  const recipientOptions = [
    { value: 'all', label: 'All Members', count: members.length },
    { value: 'elders', label: 'Elders', count: members.filter(m => m.role === 'Elder').length },
    { value: 'volunteers', label: 'Volunteers', count: members.filter(m => m.role === 'Volunteer').length },
    { value: 'youth', label: 'Youth Group', count: Math.floor(members.length * 0.3) },
    { value: 'bible-study', label: 'Bible Study Group', count: Math.floor(members.length * 0.4) }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipientOption = recipientOptions.find(r => r.value === recipients);
    const newMessage = {
      message,
      recipients: recipientOption?.label || 'All Members',
      status: scheduled ? 'Scheduled' : 'Sent' as 'Draft' | 'Scheduled' | 'Sent' | 'Failed',
      scheduledDate: scheduled ? scheduleDate : undefined,
      sentDate: scheduled ? undefined : new Date().toISOString()
    };

    addSMSMessage(newMessage);
    
    // Reset form
    setMessage('');
    setRecipients('all');
    setScheduled(false);
    setScheduleDate('');
    
    alert(`Message ${scheduled ? 'scheduled' : 'sent'} successfully!`);
  };

  const sentMessages = smsMessages.filter(m => m.status === 'Sent');
  const scheduledMessages = smsMessages.filter(m => m.status === 'Scheduled');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SMS Broadcast</h1>
        <p className="text-gray-600">Send messages to your church members</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Recipients</p>
              <p className="text-2xl font-bold text-blue-600">{members.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages Sent</p>
              <p className="text-2xl font-bold text-green-600">{sentMessages.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-600">{scheduledMessages.length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Send Message Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Send New Message</h3>
        
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <select
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {recipientOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count} members)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Type your message here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {message.length}/160 characters
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="scheduled"
              checked={scheduled}
              onChange={(e) => setScheduled(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="scheduled" className="text-sm font-medium text-gray-700">
              Schedule for later
            </label>
          </div>

          {scheduled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date & Time</label>
              <input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required={scheduled}
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              {scheduled ? 'Schedule Message' : 'Send Now'}
            </button>
          </div>
        </form>
      </div>

      {/* Scheduled Messages */}
      {scheduledMessages.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Messages</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {scheduledMessages.map(msg => (
              <div key={msg.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">{msg.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>To: {msg.recipients}</span>
                      <span>Scheduled: {msg.scheduledDate ? new Date(msg.scheduledDate).toLocaleString() : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {msg.status}
                    </span>
                    <button
                      onClick={() => updateSMSMessage(msg.id, { status: 'Sent', sentDate: new Date().toISOString() })}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Send Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sentMessages.slice(0, 10).map(msg => (
            <div key={msg.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{msg.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>To: {msg.recipients}</span>
                    <span>Sent: {msg.sentDate ? new Date(msg.sentDate).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {smsMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500">Start by sending your first message.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SMS;