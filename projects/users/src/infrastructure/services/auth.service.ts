import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IAuthenticateIn } from '../../domain/model/authenticate-in.modle';
import { IAuthenticateOut } from '../../domain/model/authenticate-out.modle';
import { AuthSharedService, environment } from 'shared';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private authShared: AuthSharedService) { }

    login(credentials: IAuthenticateIn): Observable<IAuthenticateOut> {
        console.log("llega al login");
        return this.http.post<IAuthenticateOut>(`${environment.apiUrl}/auth/usersadmin/authenticate`, credentials).pipe(
            tap(response => {
                this.authShared.setToken(response.token);
                this.authShared.setIsAuthenticated(true);
                this.authShared.setEmail(credentials.email)
            }),
            catchError(error => {
                this.authShared.logout()
                return throwError(() => new Error('Error de inicio de sesión'));
            })
        );
    }

    isAuthenticated(): boolean {
        return this.authShared.isAuthenticated(); 
    }

    getEmail(): string | null {
        return this.authShared.getEmail(); 
    }

    getToken(): string | null {
        return this.authShared.getToken(); 
    }

    /* 
    
        private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
        isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
        private userEmailSubject = new BehaviorSubject<string | null>(null);
        userEmail$ = this.userEmailSubject.asObservable();
        private token: string | null = null;
    
        constructor(private http: HttpClient) { }
    
        login(credentials: IAuthenticateIn): Observable<IAuthenticateOut> {
            console.log("llega al login");
            return this.http.post<IAuthenticateOut>(`${environment.apiUrl}/auth/usersadmin/authenticate`, credentials).pipe(
                tap(response => {
                    this.token = response.token;
                    localStorage.setItem('token', this.token);
                    this.isAuthenticatedSubject.next(true);
                    this.userEmailSubject.next(credentials.email);
                }),
                catchError(error => {
                    this.logout();
                    return throwError(() => new Error('Error de inicio de sesión'));
                })
            );
        }
    
    
    
    
        logout() {
            this.isAuthenticatedSubject.next(false);
            this.userEmailSubject.next(null);
        }
    
        isAuthenticated(): boolean {
            return this.isAuthenticatedSubject.value;
        }
    
        getEmail(): string | null {
            return this.userEmailSubject.value;
        }
    
        getToken(): string | null {
            return this.token || localStorage.getItem('token');
        } */
}
