import { User as UserType } from '../types/User';
export type User = UserType;
export const usersData: User[] = [
  {
    username: 'john',
    password: 'Password123',
    name: 'John Doe',
    email: 'john@insurance.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '15-01-1990',
    insuranceType: 'Comprehensive',
    memberSince: '15-03-2022',
    role: 'user'
  },
  {
    username: 'sunitha',
    password: 'Insurance123',
    name: 'Sunitha',
    email: 'sunitha@insurance.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Avenue, San Francisco, CA 94102',
    dateOfBirth: '18-12-1988',
    insuranceType: 'Premium',
    memberSince: '08-11-2021',
    role: 'user'
  },
  {
    username: 'admin',
    password: 'Admin123',
    name: 'Administrator',
    email: 'admin@insurance.com',
    phone: '+1 (555) 246-8135',
    address: '789 Admin Plaza, Chicago, IL 60601',
    dateOfBirth: '10-03-1982',
    insuranceType: 'Enterprise',
    memberSince: '20-06-2020',
    role: 'admin'
  }
];

export const getUserByUsername = (username: string): User | undefined => {
  return usersData.find(user => user.username === username);
};

export const getUserByName = (name: string): User | undefined => {
  return usersData.find(user => user.name === name);
};

export const getAllUsers = (): User[] => {
  return usersData;
};

export const validateUserCredentials = (username: string, password: string): boolean => {
  const user = getUserByUsername(username);
  return user ? user.password === password : false;
};

export const getUserProfileData = (username: string | null): Partial<User> => {
  if (!username) {
    return {
      email: 'user@insurance.com',
      phone: '+1 (555) 000-0000',
      address: 'Unknown Address',
      dateOfBirth: '01-01-1980',
      insuranceType: 'Standard',
      memberSince: '01-01-2023',
      role: 'user'
    };
  }

  const user = getUserByUsername(username);
  if (user) {
    return {
      email: user.email,
      phone: user.phone,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      insuranceType: user.insuranceType,
      memberSince: user.memberSince,
      role: user.role
    };
  }

  return {
    email: `${username}@insurance.com`,
    phone: '+1 (943) 000-0000',
    address: 'Standard Address',
    dateOfBirth: '01-01-1980',
    insuranceType: 'Standard',
    memberSince: '01-01-2023',
    role: 'user'
  };
};