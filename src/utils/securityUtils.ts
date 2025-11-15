
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return Math.abs(hash).toString(36);
};

const DEMO_PASSWORDS: { [key: string]: string } = {
  'john': 'Password123',      
  'sunitha': 'Insurance123', 
  'admin': 'Admin123'     
};

export const SecurityUtils = {
  validatePassword: (username: string, password: string): boolean => {
    const expectedPassword = DEMO_PASSWORDS[username];
    if (!expectedPassword) return false;
    
    return password === expectedPassword;
  },

  hashPassword: (password: string): string => {
    return simpleHash(password);
  },

  validatePasswordStrength: (password: string): { isValid: boolean; message?: string } => {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    return { isValid: true };
  },

  getDemoUsers: () => {
    return Object.keys(DEMO_PASSWORDS).map(username => ({ username }));
  }
};