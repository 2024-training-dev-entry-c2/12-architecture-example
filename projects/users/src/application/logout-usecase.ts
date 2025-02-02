import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class LogOutUseCase {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  execute(): void {
    this.tokenService.revokeToken();
    this.router.navigate(['/login']);
  }
}
