import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'authToken';
    private jwtHelper = new JwtHelperService();


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