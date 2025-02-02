import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription, tap } from "rxjs";
import { AlertService } from "shared";
import { IAuth } from "../domain/model/IAuth";
import { State } from "../domain/state";
import { AuthService } from "../infrastructure/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthUseCase {
  private readonly _service = inject(AuthService);
  private readonly _state = inject(State);
  private readonly _alert = inject(AlertService);
  private subscriptions: Subscription;
  private router = inject(Router);
  
  //#region Observables
  auth$(): Observable<IAuth> {
    return this._state.users.auth.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(credentials: { email: string, password: string }): void {
    this.subscriptions.add(
      this._service.login(credentials.email,credentials.password)
        .pipe(
          tap(result => {
            this._state.users.auth.set({
                email: result.email,
                token: result.token
            });
            this._alert.showAlert('Login successful', 'success');
            this.router.navigate(['/dashboard']);
          })
        )
        .subscribe()
    );
  }
}