import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: any;

  public currentUser: any;

  constructor() {}

  // Store user data (ID, token, etc.) in localStorage or a BehaviorSubject
  setUserData(userData: { userId: string; token?: string; role?: string; role?: string }) {
    localStorage.setItem('userId', userData.userId);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    if (userData.role) {
      localStorage.setItem('role', userData.role);
    }
    this.currentUser = { userId: userData.userId, role: userData.role };
    if (userData.role) {
      localStorage.setItem('role', userData.role);
    }
    this.currentUser = { userId: userData.userId, role: userData.role };
  }
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  clearUserData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('role');
  }
  // Optionally, you can track a "logged in" status by checking if userId/token exist
  isLoggedIn(): boolean {
    return !!this.getUserId();
  }
}