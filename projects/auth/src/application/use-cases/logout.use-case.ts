import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IAuth, IAuthenticationResponse } from '../../domain/model/auth.model';
import { State } from '../../domain/state';
import { AuthService } from '../../infrastructure/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class LogOutUseCase {
    private readonly _service = inject(AuthService);
    private readonly _state = inject(State);
    private readonly _alert = inject(ToastrService);
    private subscriptions: Subscription;
    private router = inject(Router);

    //#region Observables
    auth$(): Observable<IAuthenticationResponse> {
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
        this._alert.success('Logout successful');
        this.router.navigate(['/login']);
    }
    //#endregion

}