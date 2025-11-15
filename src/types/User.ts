export interface User {
  username: string;
  password: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  insuranceType?: string;
  memberSince?: string;
  role?: 'user' | 'admin';
  profileImage?: string;
}