import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  /**
   * Store user data (ID, token, etc.) in localStorage.
   * This method should be called after a successful login or registration.
   */
  setUserData(userData: { userId: string; token?: string }) {
    localStorage.setItem('userId', userData.userId);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  }

  /**
   * Retrieve the stored user ID from localStorage.
   * This method is used to access the user ID for API calls.
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  /**
   * Retrieve the stored token from localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Clear user data from localStorage.
   * This method should be called during logout.
   */
  clearUserData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  /**
   * Check if the user is logged in by verifying the presence of a user ID.
   */
  isLoggedIn(): boolean {
    return !!this.getUserId();
  }
}