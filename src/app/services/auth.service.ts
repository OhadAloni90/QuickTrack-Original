import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // Store user data (ID, token, etc.) in localStorage or a BehaviorSubject
  setUserData(userData: { userId: string; token?: string }) {
    localStorage.setItem('userId', userData.userId);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  }
  getUserId(): string | null {
    return localStorage.getItem('userId');
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
