import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthSharedService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthSharedService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['app/login']);
      }
      return isAuthenticated;
    })
  );
};
