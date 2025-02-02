import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService, DialogService, TokenService } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {
  private _token = inject(TokenService);
  private _admin = inject(AdminService);
  private _router = inject(Router);

  execute(): void {
    this._token.removeToken();
    this._admin.removeAdmin();
    this._router.navigate(['/auth/login']);
  }
}
