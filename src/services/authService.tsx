import { User } from '../types/User';
import { PasswordUtils } from '../utils/passwordUtils';

// Interface for user without password
export interface SafeUser extends Omit<User, 'password'> {}

class AuthService {
  private users: Map<string, User> = new Map();
  private initialized = false;

  /**
   * Initialize the user service with secure demo users
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const demoUsers = await this.loadDemoUsers();
      
      demoUsers.forEach(user => {
        this.users.set(user.username, user);
      });

      this.initialized = true;
      console.log('SecureUserService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize SecureUserService:', error);
      throw new Error('User service initialization failed');
    }
  }

  /**
   * Load demo users from environment variables with hashed passwords
   */
  private async loadDemoUsers(): Promise<User[]> {
    // In a real application, these would come from a database
    // For demo purposes, we use environment variables
    
    const usersConfig = [
      {
        username: process.env.DEMO_USER_JOHN_USERNAME || 'john',
        plainPassword: process.env.DEMO_USER_JOHN_PASSWORD || 'SecureJohnPass123!',
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
        username: process.env.DEMO_USER_SUNITHA_USERNAME || 'sunitha',
        plainPassword: process.env.DEMO_USER_SUNITHA_PASSWORD || 'SecureSunithaPass456!',
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
        username: process.env.DEMO_USER_ADMIN_USERNAME || 'admin',
        plainPassword: process.env.DEMO_USER_ADMIN_PASSWORD || 'SecureAdminPass789!',
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

    const users: User[] = [];

    for (const config of usersConfig) {
      // Validate password strength
      const strengthCheck = PasswordUtils.checkPasswordStrength(config.plainPassword);
      if (!strengthCheck.isValid) {
        console.warn(`Weak password for user ${config.username}:`, strengthCheck.feedback);
      }

      // Hash the password
      const hashedPassword = await PasswordUtils.hashPassword(config.plainPassword);

      users.push({
        username: config.username,
        password: hashedPassword,
        name: config.name,
        email: config.email,
        phone: config.phone,
        address: config.address,
        dateOfBirth: config.dateOfBirth,
        insuranceType: config.insuranceType,
        memberSince: config.memberSince,
        role: config.role as 'user' | 'admin'
      });
    }

    return users;
  }

  /**
   * Validate user credentials
   */
  async validateUserCredentials(username: string, password: string): Promise<boolean> {
    await this.initialize();
    
    const user = this.users.get(username);
    if (!user) {
      // Use constant-time comparison to prevent timing attacks
      await PasswordUtils.verifyPassword('dummy', await PasswordUtils.hashPassword('dummy'));
      return false;
    }

    return await PasswordUtils.verifyPassword(password, user.password);
  }

  /**
   * Get user by username (without password)
   */
  async getUserByUsername(username: string): Promise<SafeUser | undefined> {
    await this.initialize();
    
    const user = this.users.get(username);
    if (!user) return undefined;

    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Get all users (without passwords)
   */
  async getAllUsers(): Promise<SafeUser[]> {
    await this.initialize();
    
    return Array.from(this.users.values()).map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });
  }

  /**
   * Get demo users for quick login (without passwords)
   */
  async getDemoUsers(): Promise<SafeUser[]> {
    await this.initialize();
    return this.getAllUsers();
  }

  /**
   * Create a new user
   */
  async createUser(userData: Omit<User, 'password'> & { password: string }): Promise<SafeUser> {
    await this.initialize();

    if (this.users.has(userData.username)) {
      throw new Error('Username already exists');
    }

    // Validate password
    const strengthCheck = PasswordUtils.checkPasswordStrength(userData.password);
    if (!strengthCheck.isValid) {
      throw new Error(`Weak password: ${strengthCheck.feedback.join(', ')}`);
    }

    // Hash password
    const hashedPassword = await PasswordUtils.hashPassword(userData.password);

    const newUser: User = {
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user'
    };

    this.users.set(userData.username, newUser);

    const { password, ...safeUser } = newUser;
    return safeUser;
  }

  /**
   * Update user profile
   */
  async updateUser(username: string, updates: Partial<Omit<User, 'username' | 'password'>>): Promise<SafeUser | undefined> {
    await this.initialize();
    
    const user = this.users.get(username);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(username, updatedUser);

    const { password, ...safeUser } = updatedUser;
    return safeUser;
  }

  /**
   * Check if username exists
   */
  async usernameExists(username: string): Promise<boolean> {
    await this.initialize();
    return this.users.has(username);
  }
}

// Export singleton instance
export const authService = new AuthService();