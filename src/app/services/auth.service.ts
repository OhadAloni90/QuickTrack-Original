import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // Store user data (ID, token, etc.) in localStorage or a BehaviorSubject
  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setUserData(userData: { userId: string; token?: string }) {
    this.setUserId(userData.userId);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  clearUserData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }
  // Optionally, you can track a "logged in" status by checking if userId/token exist
  isLoggedIn(): boolean {
    return !!this.getUserId();
  }
}