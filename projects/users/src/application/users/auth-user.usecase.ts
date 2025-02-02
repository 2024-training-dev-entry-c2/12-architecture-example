import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IAuthResponseDTO } from '../../domain/model/auth.response.model';
import { IUserRequestDTO } from '../../domain/model/user.request.model';
import { AuthenticateService } from '../../infrastructure/services/authenticate.service';
import { TokenService } from 'shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthUserUsecase {
  private readonly _service = inject(AuthenticateService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private tokenService = inject(TokenService);
  public router = inject(Router);

  //#region Observables
  user$(): Observable<IAuthResponseDTO> {
    return this._state.users.user.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(user: IUserRequestDTO): void {
    this.subscriptions.add(
      this._service
        .login(user)
        .pipe(
          tap((result) => {
            this._state.users.user.set(result);
            localStorage.setItem('email', user.email);
            this.tokenService.handleToken(result.token);
            this.router.navigate(['app/dashboard']);
          })
        )
        .subscribe()
    );
  }
}
