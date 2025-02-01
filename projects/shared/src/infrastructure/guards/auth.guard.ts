import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.hasToken()) {
    return true
  }

  const redirectTo = route.data?.['redirectTo'] || 'users/login';
  
  router.navigate([redirectTo]);
  return false;

};
