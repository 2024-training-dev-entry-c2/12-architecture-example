import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { TokenService } from '../../services/token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const toastService = inject(ToastService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);
  const token = tokenService.getToken();
  let authReq = undefined;

  
  if (tokenService.hasToken()) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(authReq ?? req).pipe(
    catchError((error: HttpErrorResponse) => {
      loaderService.hide();
      switch (error.status ) {
        case 400:
          toastService.emitToast("Error", error.error.message, "error", true);
          break;

        case 401:
          tokenService.removeToken();
          router.navigate(['/login']);
          break;

        case 403:
          toastService.emitToast("Error", error.error.details[0], "error", true);
          break;

        case 500:
          toastService.emitToast("Error", error.error.details[0], "error", true);
          break;

      } 
      return throwError(() => error);
    })
  );
 
};