import { inject, Injectable } from '@angular/core';
import { RegisterService } from '../../infrastructure/services/register.service';
import { DialogService, LoadingService } from 'shared';
import { finalize, Observable, Subscription } from 'rxjs';
import { RegisterRequest } from '../../domain/model/register.request.model';
import { Router } from '@angular/router';
import { State } from '../../domain/state';
import { IUser } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterUseCase {
  private readonly _service = inject(RegisterService);
  private readonly _router = inject(Router);
  private readonly _loading = inject(LoadingService);
  private readonly _dialog = inject(DialogService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  admins$(): Observable<IUser[]> {
    return this._state.admins.$();
  }

  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscription(): void {
    this.subscriptions.unsubscribe();
  }

  execute(credentials: RegisterRequest): void {
    this._loading.setLoading(true);
    this.subscriptions.add(
      this._service
        .register(credentials)
        .pipe(finalize(() => this._loading.setLoading(false)))
        .subscribe({
          next: (response) => {
            this._state.admins.set([
              ...this._state.admins.snapshot(),
              response,
            ]);
            this._dialog.setDialogMessage('Admin created successfully');
            this._dialog.setDialog('success');
            this._router.navigate(['/admins']);
          },
          error: () => {
            this._dialog.setDialogMessage('Register error');
            this._dialog.setDialog('error');
          },
        })
    );
  }
}
