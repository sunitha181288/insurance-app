// User data utility functions
import { User } from '../../data/usersData';
import { getUserProfileData } from '../../data/usersData';

// User stats interface
export interface UserStats {
  activePolicies: number;
  monthlyPremium: number;
  claimsFiled: number;
  coverageScore: number;
}

/**
 * Generate user-specific data based on username
 */
export const generateUserData = (
  username: string | null, 
  name: string | null, 
  role: string
): User => {
  const profileData = getUserProfileData(username);
  
  const baseData: User = {
    username: username || 'unknown',
    name: name || 'Unknown User',
    password: '', // Not needed for profile
    ...profileData,
    role: role
  };

  return baseData;
};

/**
 * Generate user-specific statistics
 */
export const getUserStats = (username: string | null): UserStats => {
  switch (username) {
    case 'john':
      return {
        activePolicies: 3,
        monthlyPremium: 405,
        claimsFiled: 2,
        coverageScore: 98
      };
    
    case 'sunitha':
      return {
        activePolicies: 2,
        monthlyPremium: 285,
        claimsFiled: 1,
        coverageScore: 95
      };
    
    case 'admin':
      return {
        activePolicies: 5,
        monthlyPremium: 620,
        claimsFiled: 0,
        coverageScore: 100
      };
    
    default:
      return {
        activePolicies: 1,
        monthlyPremium: 150,
        claimsFiled: 0,
        coverageScore: 90
      };
  }
};

/**
 * Save user profile to localStorage
 */
export const saveUserProfile = (user: User): void => {
  localStorage.setItem('userProfile', JSON.stringify(user));
};

/**
 * Load user profile from localStorage
 */
export const loadUserProfile = (): User | null => {
  const saved = localStorage.getItem('userProfile');
  return saved ? JSON.parse(saved) : null;
};