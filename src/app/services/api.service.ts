// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // or wherever your backend runs
  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for login API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for getUsers API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  getUserSettings(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/settings/${id}`).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for getUserSettings API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  getItems(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/items/list/${id}`).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for getItems API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  getAllItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items/all`).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for getAllItems API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  createItem(itemData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, itemData).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for createItem API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for register API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`).pipe(
      retry(3),
      catchError((error) => {
        console.error('Max retries exceeded for getAllProducts API call');
        return throwError(() => new Error('Max retries exceeded'));
      })
    );
  }
  // ... more methods as needed
}