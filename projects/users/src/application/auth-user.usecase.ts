import { inject, Injectable } from "@angular/core";
import { AuthUserService } from "../infrastructure/services/auth-user.service";
import { State } from "../domain/state";
import { Observable, Subject, Subscription, tap } from "rxjs";
import { IUser } from "../domain/model/user.model";
import { Router } from "@angular/router";
import { TokenService, UserSessionService } from "shared";

@Injectable({ providedIn: 'root' })
export class AuthUserUsecase {
    private readonly _authUserService = inject(AuthUserService);
    private readonly _state = inject(State);
    private readonly _router = inject(Router);
    private readonly _tokenService = inject(TokenService);
    private readonly _userSessionService = inject(UserSessionService);
    private subscriptions: Subscription = new Subscription();
    private loginSuccess$ = new Subject<void>();
    private loginError$ = new Subject<string>();

    get onLoginSuccess(): Observable<void> {
        return this.loginSuccess$.asObservable();
    }

    get onLoginError(): Observable<string> {
        return this.loginError$.asObservable();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    //#region Observables
    user$(): Observable<IUser> {
        return this._state.users.user.$();
    }

    execute(userData: IUser): void {
        this.subscriptions.add(
            this._authUserService.login(userData)
                .pipe(
                    tap(data => {
                        this._tokenService.setToken(data.token);
                        const username = this._tokenService.decodeTokenAndGetUsername(data.token);
                        if (username) {
                            this._userSessionService.setUsername(username);
                        }
                        this.loginSuccess$.next(); 
                        this._router.navigate(['/dashboard/register']);

                    })
                )
                .subscribe({
                    error: (error) => {
                        this.loginError$.next('Credenciales incorrectas'); 
                    }
                })
        );
    }

}