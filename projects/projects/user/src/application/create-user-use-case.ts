import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { AlertService } from 'shared';
import { IAuth } from '../domain/model/IAuth';
import { State } from '../domain/state';
import { AuthService } from '../infrastructure/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SaveUserUseCase {
  private readonly _service = inject(AuthService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private readonly _alert = inject(AlertService);

  //#region Observables
  userSave$(): Observable<IAuth> {
    return this._state.users.userSave.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(userData: { email: any; password: any; role: any }): void {
    this.subscriptions.add(
      this._service.register(userData.email, userData.password, userData.role)
        .pipe(
          tap((result) => {
            this._state.users.userSave.set({
              email: result.email,
              token: result.token,
            });
            this._alert.showAlert("Registration Success","success");
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
