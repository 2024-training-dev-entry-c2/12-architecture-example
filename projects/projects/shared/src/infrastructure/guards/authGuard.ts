import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'user';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar el estado de la Signal directamente
  if (!authService.tokenSignal()) {
    router.navigate(['/login']); // Redirigir al login si no hay token
    return false;
  }

  return true;
};