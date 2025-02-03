import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IAuth, IAuthenticationResponse } from '../../domain/model/auth.model';
import { Router } from '@angular/router';
import { response } from 'express';
import { environment } from 'shared';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userSignal = signal<string | null>(null);
    tokenSignal = signal<string | null>(null);

    constructor(private http: HttpClient, private router: Router) { }

    private baseUrl = environment.apiUrl + '/admin';

    login(auth: IAuth): Observable<IAuthenticationResponse> {
        return this.http
            .post<IAuthenticationResponse>(`${this.baseUrl}/login`, auth)
            .pipe(
                tap((response) => this.handleAuthSuccess(response)),
                catchError(this.handleError)
            );
    }

    register(auth: IAuth): Observable<IAuthenticationResponse> {
        return this.http
        .post<IAuthenticationResponse>(`${this.baseUrl}/register`, auth)
        .pipe(
            tap((response) => this.handleAuthSuccess(response)),
            catchError(this.handleError)
        );
    }

    logout(): void {
        this.userSignal.set(null);
        this.tokenSignal.set(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigate(['/auth']);
    }

    private handleAuthSuccess(response: IAuthenticationResponse): void {
        this.userSignal.set(response.email);
        this.tokenSignal.set(response.token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('token', response.token);
    }

    private handleError(error: any): Observable<never> {
        console.error('Auth error:', error);
        return throwError(() => new Error(error.error?.message || 'Authentication failed'));
    }

    checkAuth(): void {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('email');

        if (storedToken) {
            this.tokenSignal.set(storedToken);
        }

        if (storedEmail) {
            this.userSignal.set(storedEmail);
        }

    }
}