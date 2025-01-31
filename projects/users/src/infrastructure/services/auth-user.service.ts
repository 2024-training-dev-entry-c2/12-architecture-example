import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl = 'http://localhost:8080/api/v1';
  private tokenKey = 'authToken';
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSubject.next(storedUsername);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/authenticate`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/create`, userData);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  setUsername(username: string): void {
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  removeUsername(): void {
    localStorage.removeItem('username');
    this.usernameSubject.next(null);
  }

  decodeTokenAndGetUsername(token: string): string | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken && decodedToken.sub || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  decodeTokenAndGetRoles(token: string): string[] {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken.roles) {
        const rolesArray = Array.isArray(decodedToken.roles) ? decodedToken.roles : [decodedToken.roles];
        return rolesArray.map((role: string) => `ROLE_${role}`);
      }
      return [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }
}
