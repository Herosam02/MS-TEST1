import React from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Gift,
  PieChart,
  Activity
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';
import BirthdayCard from '../components/BirthdayCard';
import RecentActivity from '../components/RecentActivity';

const Dashboard: React.FC = () => {
  const { settings, members, transactions, visitors, attendance } = useChurchData();

  // Calculate stats
  const totalMembers = members.length;
  const newMembers = members.filter(member => {
    const joinDate = new Date(member.joinDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinDate >= thirtyDaysAgo;
  }).length;

  const financialBalance = transactions.reduce((total, transaction) => {
    return transaction.type === 'Income' 
      ? total + transaction.amount 
      : total - transaction.amount;
  }, 0);

  const currentMonth = new Date().getMonth();
  const birthdaysThisMonth = members.filter(member => {
    const birthMonth = new Date(member.birthDate).getMonth();
    return birthMonth === currentMonth;
  }).length;

  // Gender demographics
  const maleCount = members.filter(m => m.gender === 'Male').length;
  const femaleCount = members.filter(m => m.gender === 'Female').length;

  // Age demographics
  const ageGroups = {
    '0-18': 0,
    '19-35': 0,
    '36-55': 0,
    '56+': 0
  };

  members.forEach(member => {
    const age = new Date().getFullYear() - new Date(member.birthDate).getFullYear();
    if (age <= 18) ageGroups['0-18']++;
    else if (age <= 35) ageGroups['19-35']++;
    else if (age <= 55) ageGroups['36-55']++;
    else ageGroups['56+']++;
  });

  // Recent attendance rate
  const recentAttendance = attendance.filter(a => a.present).length;
  const totalAttendanceRecords = attendance.length;
  const attendanceRate = totalAttendanceRecords > 0 ? (recentAttendance / totalAttendanceRecords) * 100 : 0;

  // Apply theme-based styling
  const isDarkTheme = settings.appearance.theme === 'dark';
  const containerBg = isDarkTheme ? 'bg-gray-900' : 'bg-gray-50';
  const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkTheme ? 'text-gray-300' : 'text-gray-600';
  const cardBg = isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  // Language-based content
  const getLanguageContent = () => {
    switch (settings.appearance.language) {
      case 'es':
        return {
          title: 'Panel de Control',
          subtitle: '¡Bienvenido de vuelta! Esto es lo que está pasando en tu iglesia.',
          totalMembers: 'Miembros Totales',
          newMembers: 'Nuevos Miembros',
          financialBalance: 'Balance Financiero',
          birthdaysThisMonth: 'Cumpleaños Este Mes',
          attendanceRate: 'Tasa de Asistencia',
          totalVisitors: 'Visitantes Totales',
          monthlyGiving: 'Donaciones Mensuales',
          genderDemographics: 'Demografía por Género',
          ageDemographics: 'Demografía por Edad'
        };
      case 'fr':
        return {
          title: 'Tableau de Bord',
          subtitle: 'Bon retour ! Voici ce qui se passe dans votre église.',
          totalMembers: 'Membres Totaux',
          newMembers: 'Nouveaux Membres',
          financialBalance: 'Solde Financier',
          birthdaysThisMonth: 'Anniversaires Ce Mois',
          attendanceRate: 'Taux de Présence',
          totalVisitors: 'Visiteurs Totaux',
          monthlyGiving: 'Dons Mensuels',
          genderDemographics: 'Démographie par Genre',
          ageDemographics: 'Démographie par Âge'
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome back! Here\'s what\'s happening at your church.',
          totalMembers: 'Total Members',
          newMembers: 'New Members',
          financialBalance: 'Financial Balance',
          birthdaysThisMonth: 'Birthdays This Month',
          attendanceRate: 'Attendance Rate',
          totalVisitors: 'Total Visitors',
          monthlyGiving: 'Monthly Giving',
          genderDemographics: 'Gender Demographics',
          ageDemographics: 'Age Demographics'
        };
    }
  };

  const content = getLanguageContent();

  return (
    <div className={`p-6 space-y-6 max-w-7xl mx-auto min-h-screen ${containerBg}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>{content.title}</h1>
        <p className={textSecondary}>{content.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={content.totalMembers}
          value={totalMembers.toString()}
          icon={Users}
          color="blue"
          trend={newMembers > 0 ? `+${newMembers} this month` : 'No new members'}
        />
        <StatsCard
          title={content.newMembers}
          value={newMembers.toString()}
          icon={UserPlus}
          color="green"
          trend="Last 30 days"
        />
        <StatsCard
          title={content.financialBalance}
          value={`$${financialBalance.toLocaleString()}`}
          icon={DollarSign}
          color="yellow"
          trend={financialBalance > 0 ? 'Positive balance' : 'Needs attention'}
        />
        <StatsCard
          title={content.birthdaysThisMonth}
          value={birthdaysThisMonth.toString()}
          icon={Gift}
          color="purple"
          trend="Don't forget to celebrate!"
        />
      </div>

      {/* Charts and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Demographics */}
        <ChartCard
          title={content.genderDemographics}
          data={[
            { name: 'Male', value: maleCount, color: '#3B82F6' },
            { name: 'Female', value: femaleCount, color: '#EC4899' }
          ]}
          type="pie"
        />

        {/* Age Demographics */}
        <ChartCard
          title={content.ageDemographics}
          data={[
            { name: '0-18', value: ageGroups['0-18'], color: '#10B981' },
            { name: '19-35', value: ageGroups['19-35'], color: '#F59E0B' },
            { name: '36-55', value: ageGroups['36-55'], color: '#EF4444' },
            { name: '56+', value: ageGroups['56+'], color: '#8B5CF6' }
          ]}
          type="bar"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${cardBg} rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${textSecondary}`}>{content.attendanceRate}</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>{attendanceRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`${cardBg} rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${textSecondary}`}>{content.totalVisitors}</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>{visitors.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className={`text-sm ${textSecondary} mt-2`}>
            {visitors.filter(v => !v.followedUp).length} need follow-up
          </p>
        </div>

        <div className={`${cardBg} rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${textSecondary}`}>{content.monthlyGiving}</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>
                ${transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">
            +12% from last month
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BirthdayCard members={members} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
