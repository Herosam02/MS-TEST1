import * as XLSX from 'xlsx';

export interface ChurchData {
  members: any[];
  transactions: any[];
  visitors: any[];
  attendance: any[];
}

export const exportToExcel = (data: ChurchData) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create summary sheet
  const summaryData = [
    ['Church Reports Summary', ''],
    ['Generated on:', new Date().toLocaleDateString()],
    ['', ''],
    ['Metric', 'Value'],
    ['Total Members', data.members.length],
    ['Total Visitors', data.visitors.length],
    ['Total Transactions', data.transactions.length],
    ['Total Attendance Records', data.attendance.length],
    ['', ''],
    ['Financial Summary', ''],
    ['Total Income', data.transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0)],
    ['Total Expenses', data.transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0)],
    ['Net Balance', data.transactions.reduce((total, t) => t.type === 'Income' ? total + t.amount : total - t.amount, 0)],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // Create members sheet
  if (data.members.length > 0) {
    const membersSheet = XLSX.utils.json_to_sheet(data.members);
    XLSX.utils.book_append_sheet(workbook, membersSheet, 'Members');
  }

  // Create transactions sheet
  if (data.transactions.length > 0) {
    const transactionsSheet = XLSX.utils.json_to_sheet(data.transactions);
    XLSX.utils.book_append_sheet(workbook, transactionsSheet, 'Transactions');
  }

  // Create visitors sheet
  if (data.visitors.length > 0) {
    const visitorsSheet = XLSX.utils.json_to_sheet(data.visitors);
    XLSX.utils.book_append_sheet(workbook, visitorsSheet, 'Visitors');
  }

  // Create attendance sheet
  if (data.attendance.length > 0) {
    const attendanceSheet = XLSX.utils.json_to_sheet(data.attendance);
    XLSX.utils.book_append_sheet(workbook, attendanceSheet, 'Attendance');
  }

  // Generate filename with current date
  const filename = `Church_Report_${new Date().toISOString().split('T')[0]}.xlsx`;

  // Save the file
  XLSX.writeFile(workbook, filename);
};
