import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormLoginComponent } from '../../forms/form-login/form-login.component';
import { AuthenticateUserUsecase } from '../../../../application/login/authentication.usercase';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CreateUserUsecase } from '../../../../application/users/create-user-admin.usecase';
import { IUserSystem } from '../../../../domain/model/user-system.model';
import { UserAdminComponent } from "../../components/application/user-admin/user-admin.component";

@Component({
  selector: 'lib-user-admin-container',
  imports: [UserAdminComponent],
  templateUrl: './user-admin-container.component.html',
})
export class UserAdminContainerComponent implements OnInit, OnDestroy {

  private readonly _useCase = inject(CreateUserUsecase);
  public user$: Observable<IUserSystem>;
  private readonly router = inject(Router);
  error: string | null = null;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  create(userAuth: IUserSystem) {
    console.table(userAuth);
    of(this._useCase.execute(userAuth))
      .pipe(
        switchMap(() => this.user$),
        tap((response) => {
          /*  if (response?.token) {
             this.router.navigate(['/app/main']);
             return true;
           } else {
             this.error = "Invalid credentials, please check your email and password";
             return false;
           } */
        }),
        catchError((err) => {
          //this.error = "Invalid credentials, please check your email and password";
          return of(null);
        })
      )
      .subscribe();
  }

}
