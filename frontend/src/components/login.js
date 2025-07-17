// login.js - Authentication module

/**
 * Check if the user is authenticated
 * @returns {Promise<boolean>} Authentication status
 */
export const checkAuth = async () => {
    try {
      const response = await fetch('https://3.111.49.131:4000/api/check-auth', {
        method: 'GET',
        credentials: 'include' // Include credentials for cross-origin requests
      });
  
      if (!response.ok) {
        throw new Error(`Authentication check failed: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.authenticated;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false; // Default to not authenticated on error
    }
  };
  
  /**
   * Log in a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} redirectPath - Path to redirect after login
   * @returns {Promise<{success: boolean, error: string|null}>} Login result
   */
  export const login = async (email, password, redirectPath = '/') => {
    try {
      const response = await fetch('https://3.111.49.131:4000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Include credentials
      });
  
      const data = await response.json();
  
      return {
        success: response.ok,
        error: response.ok ? null : data.error,
        redirectPath
      };
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        error: 'An error occurred. Please try again later.',
        redirectPath
      };
    }
  };
  
  /**
   * Log out the current user
   * @returns {Promise<boolean>} Logout result
   */
  export const logout = async () => {
    try {
      const response = await fetch('https://3.111.49.131:4000/api/logout', {
        method: 'GET',
        credentials: 'include'
      });
  
      if (response.ok) {
        // Clear sessionId cookie
        document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=None';
        return true;
      } else {
        console.error('Logout failed');
        return false;
      }
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };
