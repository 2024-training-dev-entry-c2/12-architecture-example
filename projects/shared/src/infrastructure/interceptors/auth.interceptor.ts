import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AlertService } from '../services/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  if (tokenService.isAuthenticated()) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
    console.log('Auth Request', authReq);
    return next(authReq);
  }
  return next(req);
};
