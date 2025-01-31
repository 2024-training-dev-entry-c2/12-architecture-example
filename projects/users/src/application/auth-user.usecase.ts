import { inject, Injectable } from "@angular/core";
import { AuthUserService } from "../infrastructure/services/auth-user.service";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IUser } from "../domain/model/user.model";

@Injectable({ providedIn: 'root' })
export class AuthUserUsecase {
    private readonly _authUserService = inject(AuthUserService);
    private readonly _state = inject(State);
    private readonly authService = inject(AuthUserService);

    //#region Observables
    user$(): Observable<IUser> {
        return this._state.users.user.$();
    }

    execute(userData: IUser): Observable<any> {
        return this._authUserService.login(userData).pipe(
          tap(data => {
                this.authService.setToken(data.token);
                const username = this.authService.decodeTokenAndGetUsername(data.token);
                 if(username) {
                    this.authService.setUsername(username);
                 }
          })
        );
    }

}