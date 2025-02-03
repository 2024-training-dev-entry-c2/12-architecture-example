import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {


  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkLocalStorage());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userEmailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email'));
  userEmail$ = this.userEmailSubject.asObservable();
  private token: string | null = localStorage.getItem('token');

  constructor() { }
  private checkLocalStorage(): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      this.token = token;
      return true;
    }
    return false;
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token)
  }
  setIsAuthenticated(auth: boolean) {
    this.isAuthenticatedSubject.next(auth);
  }
  setEmail(email: string) {
    this.userEmailSubject.next(email);
    localStorage.setItem('email', email);
  }
  logout() {
    this.isAuthenticatedSubject.next(false);
    this.userEmailSubject.next(null);
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  getEmail(): string | null {
    return this.userEmailSubject.value;
  }
  getToken(): string | null {
    return this.token;
  }

}
