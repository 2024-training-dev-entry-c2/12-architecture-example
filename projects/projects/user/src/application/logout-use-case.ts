import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'shared';
import { IAuth } from '../domain/model/IAuth';
import { State } from '../domain/state';
import { AuthService } from '../infrastructure/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogOutUseCase {
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

 execute(): void {
   this._service.logout();
   this._state.users.auth.set(null);
   this._alert.showAlert('Logout successful', 'success');
   this.router.navigate(['/login']);
 }
 //#endregion

}