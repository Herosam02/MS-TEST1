import React from 'react';
import { Gift, Calendar } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  birthDate: string;
}

interface BirthdayCardProps {
  members: Member[];
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ members }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  
  const birthdaysThisMonth = members.filter(member => {
    const birthDate = new Date(member.birthDate);
    return birthDate.getMonth() === currentMonth;
  }).sort((a, b) => {
    const dateA = new Date(a.birthDate).getDate();
    const dateB = new Date(b.birthDate).getDate();
    return dateA - dateB;
  });

  const upcomingBirthdays = birthdaysThisMonth.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Birthdays This Month</h3>
        <div className="p-2 bg-purple-100 rounded-full">
          <Gift className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      
      {upcomingBirthdays.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No birthdays this month</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingBirthdays.map((member) => {
            const birthDate = new Date(member.birthDate);
            const day = birthDate.getDate();
            const isToday = day === today.getDate();
            
            return (
              <div
                key={member.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isToday ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isToday ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name}
                  </p>
                  {isToday && (
                    <p className="text-xs text-purple-600 font-medium">Today! 🎉</p>
                  )}
                </div>
              </div>
            );
          })}
          
          {birthdaysThisMonth.length > 5 && (
            <div className="text-center pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                +{birthdaysThisMonth.length - 5} more this month
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthdayCard;