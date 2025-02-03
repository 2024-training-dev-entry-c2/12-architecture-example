import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { AuthService } from "../../infrastructure/services/auth.service";
import { IAuthenticateOut } from "../../domain/model/authenticate-out.modle";
import { IAuthenticateIn } from "../../domain/model/authenticate-in.modle";

@Injectable({
    providedIn: 'root'
})
export class AuthenticateUserUsecase {
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    private readonly _service = inject(AuthService);


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
        this.subscriptions.add(
            this._service.login(user)
                .pipe(
                    tap(result => {
                        console.log("llega al login");
                        this._state.users.authenticateOut.set(result);
                    })
                )
                .subscribe()
        );
    }
    //#endregion
}