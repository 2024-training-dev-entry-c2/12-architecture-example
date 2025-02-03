import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormLoginComponent } from '../../forms/form-login/form-login.component';
import { AuthenticateUserUsecase } from '../../../../application/users/authentication.usercase';
import { IAuthenticateIn } from '../../../../domain/model/authenticate-in.modle';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { IAuthenticateOut } from '../../../../domain/model/authenticate-out.modle';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-auth',
  imports: [FormLoginComponent],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  private readonly _useCase = inject(AuthenticateUserUsecase);
  public user$: Observable<IAuthenticateOut>;
  private readonly router = inject(Router);
  error: string | null = null;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  login(userAuth: IAuthenticateIn) {
    console.table(userAuth);
    of(this._useCase.execute(userAuth))
      .pipe(
        switchMap(() => this.user$),
        tap((response) => {
          if (response?.token) {
            this.router.navigate(['/app/main']);
            return true;
          } else {
            this.error = "Invalid credentials, please check your email and password";
            return false;
          }
        }),
        catchError((err) => {
          this.error = "Invalid credentials, please check your email and password";
          return of(null);
        })
      )
      .subscribe();
  }

}
