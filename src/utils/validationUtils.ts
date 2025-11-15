// Validation error types
export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

/**
 * Validate name field
 */
export const validateName = (name: string): string | undefined => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters';
  }
  return undefined;
};

/**
 * Validate email field
 */
export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

/**
 * Validate phone number field
 */
export const validatePhone = (phone: string): string | undefined => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  // Allow various phone number formats: +1 (555) 123-4567, 555-123-4567, 5551234567, etc.
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    return 'Please enter a valid phone number';
  }
  return undefined;
};

/**
 * Validate date of birth field
 */
export const validateDateOfBirth = (dateOfBirth: string): string | undefined => {
  if (!dateOfBirth) {
    return 'Date of birth is required';
  }
  
  // Check if date is in DD-MM-YYYY format
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  if (!dateRegex.test(dateOfBirth)) {
    return 'Please enter date in DD-MM-YYYY format';
  }
  
  // Parse the date
  const [day, month, year] = dateOfBirth.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  
  // Validate the date is valid
  if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
    return 'Please enter a valid date';
  }
  
  // Check if user is at least 18 years old
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 18);
  
  if (birthDate > minDate) {
    return 'You must be at least 18 years old';
  }
  
  // Check if date is not too far in the past (reasonable age limit)
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 100);
  
  if (birthDate < maxDate) {
    return 'Please enter a valid date of birth';
  }
  
  return undefined;
};

/**
 * Validate address field
 */
export const validateAddress = (address: string): string | undefined => {
  if (!address.trim()) {
    return 'Address is required';
  }
  if (address.length < 10) {
    return 'Address must be at least 10 characters long';
  }
  if (address.length > 200) {
    return 'Address must be less than 200 characters';
  }
  return undefined;
};

/**
 * Validate password field
 */
export const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  return undefined;
};

/**
 * Validate if two passwords match
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): string | undefined => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return undefined;
};

/**
 * Validate username field
 */
export const validateUsername = (username: string): string | undefined => {
  if (!username.trim()) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return undefined;
};

/**
 * Validate login form
 */
export const validateLoginForm = (username: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {
    username: validateUsername(username),
    password: validatePassword(password)
  };
  
  return errors;
};

/**
 * Validate signup form
 */
export const validateSignupForm = (username: string, password: string, confirmPassword: string): ValidationErrors => {
  const errors: ValidationErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
    confirmPassword: validatePasswordMatch(password, confirmPassword)
  };
  
  return errors;
};

/**
 * Validate profile form
 */
export const validateProfileForm = (formData: {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (formData.name !== undefined) {
    errors.name = validateName(formData.name);
  }
  
  if (formData.email !== undefined) {
    errors.email = validateEmail(formData.email);
  }
  
  if (formData.phone !== undefined) {
    errors.phone = validatePhone(formData.phone);
  }
  
  if (formData.dateOfBirth !== undefined) {
    errors.dateOfBirth = validateDateOfBirth(formData.dateOfBirth);
  }
  
  if (formData.address !== undefined) {
    errors.address = validateAddress(formData.address);
  }

  return errors;
};

/**
 * Validate entire form
 */
export const validateForm = (formData: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (formData.name !== undefined) {
    errors.name = validateName(formData.name);
  }
  
  if (formData.email !== undefined) {
    errors.email = validateEmail(formData.email);
  }
  
  if (formData.phone !== undefined) {
    errors.phone = validatePhone(formData.phone);
  }
  
  if (formData.dateOfBirth !== undefined) {
    errors.dateOfBirth = validateDateOfBirth(formData.dateOfBirth);
  }
  
  if (formData.address !== undefined) {
    errors.address = validateAddress(formData.address);
  }
  
  if (formData.password !== undefined) {
    errors.password = validatePassword(formData.password);
  }
  
  if (formData.confirmPassword !== undefined && formData.password !== undefined) {
    errors.confirmPassword = validatePasswordMatch(formData.password, formData.confirmPassword);
  }

  return errors;
};

/**
 * Check if form is valid (no errors)
 */
export const isFormValid = (errors: ValidationErrors): boolean => {
  return !Object.values(errors).some(error => error !== undefined);
};