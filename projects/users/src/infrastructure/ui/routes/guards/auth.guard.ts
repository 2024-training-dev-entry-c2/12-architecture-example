import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthUserService } from '../../../services/auth-user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthUserService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
