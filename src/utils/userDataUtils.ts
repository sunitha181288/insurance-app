import { User } from '../types/User';
import { getUserProfileData } from './authUtils';
import { generateAvatarFromName, loadProfileImage } from './imageUtils';

export interface UserStats {
  activePolicies: number;
  monthlyPremium: number;
  claimsFiled: number;
  coverageScore: number;
}


export const generateUserData = (
  username: string | null, 
  name: string | null, 
  role: string
): User => {
  const profileData = getUserProfileData(username);
  
  let profileImage = username ? loadProfileImage(username) : undefined;
  if (!profileImage && name) {
    profileImage = generateAvatarFromName(name);
  }
  
  const baseData: User = {
    username: username || 'unknown',
    name: name || 'Unknown User',
    password: '[HIDDEN]', // Never expose password
    ...profileData,
    role: role as 'user' | 'admin',
    profileImage: profileImage || undefined
  };

  return baseData;
};


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


export const saveUserProfile = (user: User): void => {
  const { password, ...safeUser } = user;
  localStorage.setItem('userProfile', JSON.stringify(safeUser));
};


export const loadUserProfile = (): User | null => {
  try {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const userData = JSON.parse(saved);
      return {
        ...userData,
        password: '[HIDDEN]'
      };
    }
    return null;
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};