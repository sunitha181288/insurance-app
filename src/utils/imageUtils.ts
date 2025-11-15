// Image utility functions

/**
 * Convert file to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Validate image file
 */
export const validateImage = (file: File): { isValid: boolean; message?: string } => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      message: 'Please select a valid image file (JPEG, PNG, GIF, WebP)'
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'Image size must be less than 5MB'
    };
  }

  return { isValid: true };
};

/**
 * Compress image while maintaining quality
 */
export const compressImage = (file: File, maxWidth = 800, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Image compression failed'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Generate avatar from name (fallback)
 */
export const generateAvatarFromName = (name: string, size = 150): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=${size}`;
};

/**
 * Save profile image to localStorage
 */
export const saveProfileImage = (username: string, imageData: string): void => {
  localStorage.setItem(`profileImage_${username}`, imageData);
};

/**
 * Load profile image from localStorage
 */
export const loadProfileImage = (username: string): string | null => {
  return localStorage.getItem(`profileImage_${username}`);
};

/**
 * Delete profile image from localStorage
 */
export const deleteProfileImage = (username: string): void => {
  localStorage.removeItem(`profileImage_${username}`);
};