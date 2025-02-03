import { Injectable, inject } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { IAuthenticateOut } from "../../domain/model/authenticate-out.modle";
import { State } from "../../domain/state";
import { IAuthenticateIn } from "../../domain/model/authenticate-in.modle";

@Injectable({
    providedIn: 'root'
})
export class AuthenticateUseCase {

    private subscriptions: Subscription;
    private readonly _state = inject(State);

    //#region Observables
    user$(): Observable<IAuthenticateOut> {
        return this._state.users.authenticateOut.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(user: IAuthenticateIn): void {

    }
    //#endregion
}