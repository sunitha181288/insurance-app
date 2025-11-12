const users = [
  { username: 'john', password: 'password123', name: 'John Doe' },
  { username: 'sunitha', password: 'insurance123', name: 'Sunitha' },
  { username: 'admin', password: 'admin123', name: 'Administrator' }
];

export const AuthService = {
  login: (username: string, password: string): Promise<{success: boolean, user?: any}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', user.username);
          localStorage.setItem('userName', user.name);
          localStorage.setItem('userRole', user.username === 'admin' ? 'admin' : 'user');
          resolve({ success: true, user });
        } else {
          resolve({ success: false });
        }
      }, 1500);
    });
  },

  signup: (username: string, password: string): Promise<{success: boolean, user?: any}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
          resolve({ success: false });
          return;
        }

        const newUser = {
          username,
          password,
          name: username.charAt(0).toUpperCase() + username.slice(1)
        };

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', newUser.username);
        localStorage.setItem('userName', newUser.name);
        localStorage.setItem('userRole', 'user');
        
        resolve({ success: true, user: newUser });
      }, 1500);
    });
  },

  logout: (): void => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  getUser: () => {
    return {
      username: localStorage.getItem('username'),
      name: localStorage.getItem('userName'),
      role: localStorage.getItem('userRole')
    };
  },

  getDemoUsers: () => {
    return users;
  }
};