import { User } from '../types/User';

export interface DemoUserConfig {
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  insuranceType: string;
  memberSince: string;
  role: 'user' | 'admin';
}

export const demoUserConfigs: DemoUserConfig[] = [
  {
    username: 'john',
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

export const getDemoUserByUsername = (username: string): DemoUserConfig | undefined => {
  return demoUserConfigs.find(user => user.username === username);
};

export const getAllDemoUsers = (): DemoUserConfig[] => {
  return demoUserConfigs;
};