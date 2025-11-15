import bcrypt from 'bcryptjs';

export class PasswordUtils {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verify a password against its hash
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      return false;
    }
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate a secure random password
   */
  static generateSecurePassword(length: number = 16): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    
    // Ensure at least one of each character type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest with random characters
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Check password strength
   */
  static checkPasswordStrength(password: string): { isValid: boolean; score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('Password should be at least 8 characters long');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include at least one uppercase letter');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include at least one lowercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include at least one number');

    if (/[!@#$%^&*]/.test(password)) score += 1;
    else feedback.push('Include at least one special character (!@#$%^&*)');

    return {
      isValid: score >= 4,
      score,
      feedback: score >= 4 ? ['Password is strong'] : feedback
    };
  }
}