import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { catchError, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateUserFormComponent } from '../../forms/create-user-form/create-user-form.component';
import { CreateUserUsecase } from '../../../../application/users/create-user-admin.usecase';
import { IUserSystem } from '../../../../domain/model/user-system.model';

@Component({
  selector: 'lib-create-users',
  imports: [AsyncPipe, CreateUserFormComponent],
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateUserUsecase);
  public user$: Observable<IUserSystem>;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  createUser(userAuth: IUserSystem): void {
    console.log("llega con los datos");
    console.table(userAuth);
    of(this._useCase.execute(userAuth))
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.user$),
        tap((response) => {
          console.log(response);

        }),
        catchError((err) => {
          //this._errorService.handleError("Invalid credentials, please check your email and password")
          return of(null);
        })
      )
      .subscribe();
  }
}
