// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // or wherever your backend runs
  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getUserSettings(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/settings/${id}`);
  }
  getItems(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/items/list/${id}`); // example endpoint
  }
  createItem(itemData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, itemData);
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }
  getUserItems(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/items`);
  }
  // ... more methods as needed
}
