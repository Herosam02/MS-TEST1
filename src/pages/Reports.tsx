import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
} from 'lucide-react';
import { useChurchData } from '../context/ChurchDataContext';
import { exportToExcel } from '../utils/excelExport';
import { toast } from 'sonner';
import AddReportDialog from '../components/AddReportDialog';

const Reports: React.FC = () => {
  const { members, transactions, visitors, attendance, reports: contextReports, generateReport } = useChurchData();
  const [reports, setReports] = useState(contextReports);

  useEffect(() => {
    setReports(contextReports);
  }, [contextReports]);

  const handleAddReport = (newReport: {
    id: string;
    title: string;
    description: string;
    dateGenerated: string;
    status: string;
  }) => {
    setReports((prevReports) => [newReport, ...prevReports]);
  };

  const handleExportReports = () => {
    try {
      exportToExcel({ members, transactions, visitors, attendance });
      toast.success('Reports exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export reports. Please try again.');
    }
  };

  const handleGenerateReport = (type: string) => {
    generateReport(type);
    toast.success(`${type} report generated successfully!`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Generate and view detailed church reports</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={handleExportReports}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Reports
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: <Users className="h-6 w-6 text-blue-600" />,
            title: 'Membership Reports',
            desc: 'Member growth and engagement reports.',
            status: 'Updated daily',
            type: 'Membership',
          },
          {
            icon: <DollarSign className="h-6 w-6 text-green-600" />,
            title: 'Financial Reports',
            desc: 'Income, giving, and expenses overview.',
            status: 'Updated weekly',
            type: 'Financial',
          },
          {
            icon: <Calendar className="h-6 w-6 text-purple-600" />,
            title: 'Attendance Reports',
            desc: 'Service attendance and participation.',
            status: 'After services',
            type: 'Attendance',
          },
          {
            icon: <TrendingUp className="h-6 w-6 text-yellow-600" />,
            title: 'Growth Analytics',
            desc: 'Church growth and outreach metrics.',
            status: 'Monthly insights',
            type: 'Growth',
          },
          {
            icon: <BarChart3 className="h-6 w-6 text-red-600" />,
            title: 'Custom Reports',
            desc: 'Create custom reports based on filters.',
            status: 'User-defined',
            type: 'Custom',
            custom: true,
          },
          {
            icon: <Calendar className="h-6 w-6 text-indigo-600" />,
            title: 'Event Reports',
            desc: 'Special programs and events summary.',
            status: 'Event-based',
            type: 'Event',
          },
        ].map((card, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <div>{card.icon}</div>
              <span className="text-sm text-gray-400">{card.status}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
            {card.custom ? (
              <AddReportDialog onAdd={handleAddReport}>
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Create Custom →
                </button>
              </AddReportDialog>
            ) : (
              <button
                onClick={() => handleGenerateReport(card.type)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Generate Report →
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports ({reports.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-md font-medium text-gray-900">{report.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Generated on {new Date(report.dateGenerated).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      report.status === 'Ready'
                        ? 'bg-green-100 text-green-800'
                        : report.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {report.status}
                  </span>
                  <button
                    className={`p-2 transition-colors ${
                      report.status === 'Ready'
                        ? 'text-gray-400 hover:text-blue-600'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={report.status !== 'Ready'}
                    onClick={() => {
                      exportToExcel({ members, transactions, visitors, attendance });
                      toast.success(`${report.title} exported successfully!`);
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="p-6 text-gray-500 text-sm text-center">No reports generated yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
