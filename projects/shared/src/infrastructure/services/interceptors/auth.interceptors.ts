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
import { TokenService } from '../token.service';
import { UserSessionService } from '../user-sesion.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const tokenService = inject(TokenService)
  const userSessionService = inject(UserSessionService);

  const token = tokenService.getToken();
  let request = req;

  if (token) {
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      tokenService.removeToken();
      userSessionService.removeUsername();
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
        tokenService.removeToken();
        userSessionService.removeUsername();
        router.navigate(['/login']);
        return throwError(() => new Error('No autorizado'));
      }
      return throwError(() => error);
    })
  );
};