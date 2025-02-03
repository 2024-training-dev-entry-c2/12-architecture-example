import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  revokeToken(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

}