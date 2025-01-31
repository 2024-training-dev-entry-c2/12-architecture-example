import {
    HttpInterceptorFn,
    HttpErrorResponse,
    HttpRequest,
    HttpHandlerFn,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUserService } from '../auth-user.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthUserService);
    const router = inject(Router);
    const jwtHelper = new JwtHelperService();

    const token = authService.getToken();
    let request = req;

    if (token) {
      const isTokenExpired = jwtHelper.isTokenExpired(token);
        if(isTokenExpired){
            authService.removeToken();
            authService.setUsername("");
            router.navigate(['/login']);
            return throwError(() => new Error('Token expirado'));
        }


        if (!req.headers.has('Authorization')) {
             request = req.clone({
               setHeaders: {
                 Authorization: `Bearer ${token}`,
               },
             });
           }
       }


    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.removeToken();
                authService.setUsername("");
                router.navigate(['/login']);
                return throwError(() => new Error('No autorizado'));
            }
            return throwError(() => error);
        })
    );
};