// Authentication utility functions
import { User } from '../../data/usersData';
import { usersData, getUserByUsername, validateUserCredentials } from '../../data/usersData';

// Login response interface
export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Signup response interface
export interface SignupResponse {
  success: boolean;
  user?: User;
  message?: string;
}

/**
 * Authenticate user login
 */
export const authenticateUser = async (username: string, password: string): Promise<LoginResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const user = getUserByUsername(username);
  
  if (user && validateUserCredentials(username, password)) {
    return {
      success: true,
      user: user
    };
  } else {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }
};

/**
 * Register new user
 */
export const registerUser = async (username: string, password: string): Promise<SignupResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const existingUser = getUserByUsername(username);
  if (existingUser) {
    return {
      success: false,
      message: 'Username already exists'
    };
  }
  
  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters long'
    };
  }
  
  const newUser: User = {
    username,
    password,
    name: username.charAt(0).toUpperCase() + username.slice(1)
  };
  
  return {
    success: true,
    user: newUser
  };
};

/**
 * Save user session to localStorage
 */
export const saveUserSession = (user: User): void => {
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('username', user.username);
  localStorage.setItem('userName', user.name);
  localStorage.setItem('userRole', user.username === 'admin' ? 'admin' : 'user');
};

/**
 * Clear user session from localStorage
 */
export const clearUserSession = (): void => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

/**
 * Get current user from session
 */
export const getCurrentUser = () => {
  if (!isAuthenticated()) return null;
  
  return {
    username: localStorage.getItem('username'),
    name: localStorage.getItem('userName'),
    role: localStorage.getItem('userRole')
  };
};

/**
 * Get demo users for quick login
 */
export const getDemoUsers = (): User[] => {
  return usersData;
};