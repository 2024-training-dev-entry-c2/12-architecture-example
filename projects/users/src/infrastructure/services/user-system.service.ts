import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';
import { IUserSystem } from '../../domain/model/user-system.model';


@Injectable({
    providedIn: 'root'
})
export class UserSystemService {

    private apiUri = '/auth/usersadmin';

    constructor(private http: HttpClient) { }

    createUserAdmin(userAdmin: IUserSystem): Observable<IUserSystem> {
        return this.http.post<IUserSystem>(`${environment.apiUrl}${this.apiUri}`, userAdmin).pipe(
            catchError((error) => {
                console.error('Error en createUserAdmin:', error);
                return throwError(() => error.error || { message: 'Error desconocido', status: error.status });
            })
        );
    }



    getUserAdmin(): Observable<IUserSystem[]> {
        return this.http.get<IUserSystem[]>(`${environment.apiUrl}${this.apiUri}`).pipe(
            tap(customers => console.log('users admins cargados', customers)),
            catchError(this.handleError<IUserSystem[]>('getUserAdmin', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
