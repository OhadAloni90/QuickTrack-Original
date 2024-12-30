// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // or wherever your backend runs
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getUserSettings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/settings`);
  }
  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items/list`); // example endpoint
  }
  // ... more methods as needed
}
