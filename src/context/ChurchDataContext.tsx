import React, { createContext, useContext, useState, useEffect } from 'react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'Male' | 'Female';
  joinDate: string;
  status: 'Active' | 'Inactive';
  address: string;
  role: string;
}

interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  amount: number;
  description: string;
  date: string;
  category: string;
}

interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  service: string;
  present: boolean;
}

interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  source: string;
  followedUp: boolean;
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'Excellent' | 'Good' | 'Needs Attention' | 'Poor';
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  notes?: string;
}

interface SMSMessage {
  id: string;
  message: string;
  recipients: string;
  scheduledDate?: string;
  sentDate?: string;
  status: 'Draft' | 'Scheduled' | 'Sent' | 'Failed';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Secretary' | 'Treasurer' | 'Volunteer';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

interface ChurchSettings {
  churchName: string;
  pastorName: string;
  address: string;
  phone: string;
  email: string;
  notifications: {
    email: boolean;
    sms: boolean;
    birthdays: boolean;
  };
  security: {
    sessionTimeout: number;
    twoFactorAuth: boolean;
    passwordRequirements: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
}

interface ChurchData {
  members: Member[];
  transactions: Transaction[];
  attendance: AttendanceRecord[];
  visitors: Visitor[];
  equipment: Equipment[];
  smsMessages: SMSMessage[];
  users: User[];
  settings: ChurchSettings;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addAttendance: (attendance: Omit<AttendanceRecord, 'id'>) => void;
  addVisitor: (visitor: Omit<Visitor, 'id'>) => void;
  updateVisitor: (id: string, visitor: Partial<Visitor>) => void;
  addEquipment: (equipment: Omit<Equipment, 'id'>) => void;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => void;
  deleteEquipment: (id: string) => void;
  addSMSMessage: (message: Omit<SMSMessage, 'id'>) => void;
  updateSMSMessage: (id: string, message: Partial<SMSMessage>) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  updateSettings: (settings: Partial<ChurchSettings>) => void;
}

const ChurchDataContext = createContext<ChurchData | undefined>(undefined);

export const useChurchData = () => {
  const context = useContext(ChurchDataContext);
  if (!context) {
    throw new Error('useChurchData must be used within a ChurchDataProvider');
  }
  return context;
};

// Local storage keys
const STORAGE_KEYS = {
  MEMBERS: 'church_members',
  TRANSACTIONS: 'church_transactions',
  ATTENDANCE: 'church_attendance',
  VISITORS: 'church_visitors',
  EQUIPMENT: 'church_equipment',
  SMS_MESSAGES: 'church_sms_messages',
  USERS: 'church_users',
  SETTINGS: 'church_settings'
};

// Helper functions for localStorage
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const ChurchDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with data from localStorage or default values
  const [members, setMembers] = useState<Member[]>(() => 
    loadFromStorage(STORAGE_KEYS.MEMBERS, [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1234567890',
        birthDate: '1990-03-15',
        gender: 'Male',
        joinDate: '2020-01-15',
        status: 'Active',
        address: '123 Main St, City',
        role: 'Member'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1234567891',
        birthDate: '1985-07-22',
        gender: 'Female',
        joinDate: '2019-05-10',
        status: 'Active',
        address: '456 Oak Ave, City',
        role: 'Elder'
      },
      {
        id: '3',
        name: 'Michael Davis',
        email: 'michael.davis@email.com',
        phone: '+1234567892',
        birthDate: '1992-12-03',
        gender: 'Male',
        joinDate: '2024-01-08',
        status: 'Active',
        address: '789 Pine St, City',
        role: 'Member'
      }
    ])
  );

  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage(STORAGE_KEYS.TRANSACTIONS, [
      {
        id: '1',
        type: 'Income',
        amount: 5000,
        description: 'Sunday Offering',
        date: '2024-01-07',
        category: 'Offerings'
      },
      {
        id: '2',
        type: 'Income',
        amount: 2500,
        description: 'Tithe Collection',
        date: '2024-01-14',
        category: 'Tithes'
      },
      {
        id: '3',
        type: 'Expense',
        amount: 800,
        description: 'Utilities Payment',
        date: '2024-01-15',
        category: 'Utilities'
      }
    ])
  );

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    loadFromStorage(STORAGE_KEYS.ATTENDANCE, [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Smith',
        date: '2024-01-21',
        service: 'Sunday Morning',
        present: true
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Johnson',
        date: '2024-01-21',
        service: 'Sunday Morning',
        present: true
      },
      {
        id: '3',
        memberId: '3',
        memberName: 'Michael Davis',
        date: '2024-01-21',
        service: 'Sunday Morning',
        present: false
      }
    ])
  );

  const [visitors, setVisitors] = useState<Visitor[]>(() =>
    loadFromStorage(STORAGE_KEYS.VISITORS, [
      {
        id: '1',
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+1234567893',
        visitDate: '2024-01-21',
        source: 'Friend Invitation',
        followedUp: false
      },
      {
        id: '2',
        name: 'David Brown',
        email: 'david.brown@email.com',
        phone: '+1234567894',
        visitDate: '2024-01-14',
        source: 'Walk-in',
        followedUp: true
      }
    ])
  );

  const [equipment, setEquipment] = useState<Equipment[]>(() =>
    loadFromStorage(STORAGE_KEYS.EQUIPMENT, [
      {
        id: '1',
        name: 'Sound System',
        category: 'Audio',
        status: 'Good',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-04-15',
        location: 'Main Sanctuary'
      },
      {
        id: '2',
        name: 'Projector',
        category: 'Visual',
        status: 'Needs Attention',
        lastMaintenance: '2023-12-01',
        nextMaintenance: '2024-03-01',
        location: 'Main Sanctuary'
      },
      {
        id: '3',
        name: 'Piano',
        category: 'Musical',
        status: 'Excellent',
        lastMaintenance: '2024-01-08',
        nextMaintenance: '2024-07-08',
        location: 'Main Sanctuary'
      }
    ])
  );

  const [smsMessages, setSmsMessages] = useState<SMSMessage[]>(() =>
    loadFromStorage(STORAGE_KEYS.SMS_MESSAGES, [
      {
        id: '1',
        message: 'Sunday service starts at 10 AM. See you there!',
        recipients: 'All Members',
        sentDate: '2024-01-21T08:00:00',
        status: 'Sent'
      },
      {
        id: '2',
        message: 'Bible study this Wednesday at 7 PM',
        recipients: 'Bible Study Group',
        sentDate: '2024-01-19T15:30:00',
        status: 'Sent'
      }
    ])
  );

  const [users, setUsers] = useState<User[]>(() =>
    loadFromStorage(STORAGE_KEYS.USERS, [
      {
        id: '1',
        name: 'Pastor John Smith',
        email: 'pastor@church.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2024-01-21T10:30:00'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@church.com',
        role: 'Secretary',
        status: 'Active',
        lastLogin: '2024-01-20T14:15:00'
      },
      {
        id: '3',
        name: 'Michael Davis',
        email: 'michael@church.com',
        role: 'Treasurer',
        status: 'Active',
        lastLogin: '2024-01-19T09:45:00'
      }
    ])
  );

  const [settings, setSettings] = useState<ChurchSettings>(() =>
    loadFromStorage(STORAGE_KEYS.SETTINGS, {
      churchName: 'Grace Community Church',
      pastorName: 'Pastor John Smith',
      address: '123 Church Street, Community City, State 12345',
      phone: '(555) 123-4567',
      email: 'info@gracechurch.com',
      notifications: {
        email: true,
        sms: false,
        birthdays: true
      },
      security: {
        sessionTimeout: 60,
        twoFactorAuth: false,
        passwordRequirements: true
      },
      appearance: {
        theme: 'light',
        language: 'en'
      }
    })
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MEMBERS, members);
  }, [members]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ATTENDANCE, attendance);
  }, [attendance]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.VISITORS, visitors);
  }, [visitors]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EQUIPMENT, equipment);
  }, [equipment]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SMS_MESSAGES, smsMessages);
  }, [smsMessages]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  // Member functions
  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, memberUpdate: Partial<Member>) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...memberUpdate } : member
    ));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  // Transaction functions
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions(prev => [...prev, newTransaction]);
  };

  // Attendance functions
  const addAttendance = (attendanceRecord: Omit<AttendanceRecord, 'id'>) => {
    const member = members.find(m => m.id === attendanceRecord.memberId);
    const newAttendance = { 
      ...attendanceRecord, 
      id: Date.now().toString(),
      memberName: member?.name || 'Unknown Member'
    };
    
    // Remove existing attendance record for same member, date, and service
    setAttendance(prev => {
      const filtered = prev.filter(a => 
        !(a.memberId === attendanceRecord.memberId && 
          a.date === attendanceRecord.date && 
          a.service === attendanceRecord.service)
      );
      return [...filtered, newAttendance];
    });
  };

  // Visitor functions
  const addVisitor = (visitor: Omit<Visitor, 'id'>) => {
    const newVisitor = { ...visitor, id: Date.now().toString() };
    setVisitors(prev => [...prev, newVisitor]);
  };

  const updateVisitor = (id: string, visitorUpdate: Partial<Visitor>) => {
    setVisitors(prev => prev.map(visitor => 
      visitor.id === id ? { ...visitor, ...visitorUpdate } : visitor
    ));
  };

  // Equipment functions
  const addEquipment = (equipmentItem: Omit<Equipment, 'id'>) => {
    const newEquipment = { ...equipmentItem, id: Date.now().toString() };
    setEquipment(prev => [...prev, newEquipment]);
  };

  const updateEquipment = (id: string, equipmentUpdate: Partial<Equipment>) => {
    setEquipment(prev => prev.map(item => 
      item.id === id ? { ...item, ...equipmentUpdate } : item
    ));
  };

  const deleteEquipment = (id: string) => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  };

  // SMS functions
  const addSMSMessage = (message: Omit<SMSMessage, 'id'>) => {
    const newMessage = { ...message, id: Date.now().toString() };
    setSmsMessages(prev => [...prev, newMessage]);
  };

  const updateSMSMessage = (id: string, messageUpdate: Partial<SMSMessage>) => {
    setSmsMessages(prev => prev.map(message => 
      message.id === id ? { ...message, ...messageUpdate } : message
    ));
  };

  // User functions
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, userUpdate: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userUpdate } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // Settings functions
  const updateSettings = (settingsUpdate: Partial<ChurchSettings>) => {
    setSettings(prev => ({ ...prev, ...settingsUpdate }));
  };

  const contextValue: ChurchData = {
    members,
    transactions,
    attendance,
    visitors,
    equipment,
    smsMessages,
    users,
    settings,
    addMember,
    updateMember,
    deleteMember,
    addTransaction,
    addAttendance,
    addVisitor,
    updateVisitor,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addSMSMessage,
    updateSMSMessage,
    addUser,
    updateUser,
    deleteUser,
    updateSettings
  };

  return (
    <ChurchDataContext.Provider value={contextValue}>
      {children}
    </ChurchDataContext.Provider>
  );
};