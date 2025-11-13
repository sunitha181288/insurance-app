// Date utility functions

/**
 * Format date to DD-MM-YYYY format
 * @param dateString - Date in any format
 * @returns Formatted date string in DD-MM-YYYY format
 */
export const formatDateToDDMMYYYY = (dateString: string): string => {
  if (!dateString) return '';
  
  // If already in DD-MM-YYYY format, return as is
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  // If in YYYY-MM-DD format, convert to DD-MM-YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  
  // Try to parse as Date object
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  return dateString;
};

/**
 * Format date to YYYY-MM-DD format (for IonDatetime)
 * @param dateString - Date in any format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export const formatDateToYYYYMMDD = (dateString: string): string => {
  if (!dateString) return '';
  
  // If in DD-MM-YYYY format, convert to YYYY-MM-DD
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Try to parse as Date object
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return dateString;
};

/**
 * Parse DD-MM-YYYY string to Date object
 * @param dateString - Date string in DD-MM-YYYY format
 * @returns Date object
 */
export const parseDDMMYYYYToDate = (dateString: string): Date => {
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(dateString);
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns Current date in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Validate if date is in DD-MM-YYYY format
 * @param dateString - Date string to validate
 * @returns boolean indicating if format is valid
 */
export const isValidDDMMYYYY = (dateString: string): boolean => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return regex.test(dateString);
};

/**
 * Calculate age from date of birth
 * @param dateOfBirth - Date of birth in DD-MM-YYYY format
 * @returns Age in years
 */
export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = parseDDMMYYYYToDate(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};