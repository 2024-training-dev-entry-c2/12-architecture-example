import { inject, Injectable } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { State } from "../domain/state";
import { IAuthResponse } from "../domain/model/auth-response.model";
import { AuthUserService } from "../infrastructure/services/auth-user.service";
import { IAuthRequest } from "../domain/model/auth-request.model";
import { Router } from "@angular/router";
import { LoaderService, TokenService } from "shared";

@Injectable({
    providedIn: 'root'
})
export class AuthUserUseCase {
    private readonly _service = inject(AuthUserService);
    private readonly _state = inject(State);
    private router = inject(Router);
    private tokenService = inject(TokenService);
    private loaderService = inject(LoaderService);
    private subscriptions: Subscription;
  
    //#region Observables
    authUser$(): Observable<IAuthResponse> {
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
  
    execute(user: IAuthRequest): void {
      this.loaderService.show(true);
      this.subscriptions.add(
        this._service.authUser(user)
          .pipe(
            tap(result => {
                if (result!.token) {
                    this._state.users.auth.set(result);
                    if (result?.token) {
                      localStorage.setItem('email', user.email);
                      this.tokenService.handleToken(result.token);
                      this.router.navigate(['']);
                    }
                }
                this.loaderService.show(false);
            })
          )
          .subscribe()
      );
    }
    //#endregion

}