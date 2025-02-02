import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../infrastructure/services/login.service';
import { State } from '../../domain/state';
import { IAdmin } from '../../domain/model/admin.model';
import { LoginRequest } from '../../domain/model/login.request.model';
import { finalize, Observable, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  AdminService,
  DialogService,
  LoadingService,
  TokenService,
} from 'shared';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private readonly _service = inject(LoginService);
  private readonly _adminService = inject(AdminService);
  private readonly _state = inject(State);
  private readonly _token = inject(TokenService);
  private readonly _loading = inject(LoadingService);
  private readonly _router = inject(Router);
  private readonly _dialog = inject(DialogService);
  private subscriptions: Subscription;

  admin$(): Observable<IAdmin> {
    return this._state.admin.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
    this._state.admin.set(this._adminService.getAdmin());
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(credentials: LoginRequest): void {
    this._loading.setLoading(true);
    this.subscriptions.add(
      this._service
        .login(credentials)
        .pipe(finalize(() => this._loading.setLoading(false)))
        .pipe(
          tap((admin) => {
            this._token.setToken(admin.token);
            this._state.admin.set(admin);
            this._adminService.setAdmin(admin);
          })
        )
        .subscribe({
          next: () => {
            this._router.navigate(['/']);
          },
          error: (error) => {
            if (
              error.status === 403 &&
              error.error &&
              error.error.error === 'Bad credentials'
            ) {
              this._dialog.setDialogMessage('Bad credentials');
            } else {
              this._dialog.setDialogMessage('Login error');
            }
            this._dialog.setDialog('error');
          },
        })
    );
  }
}
