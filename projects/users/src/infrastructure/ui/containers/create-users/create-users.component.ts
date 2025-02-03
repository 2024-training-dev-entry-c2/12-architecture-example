import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { catchError, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateUserFormComponent } from '../../forms/create-user-form/create-user-form.component';
import { CreateUserUsecase } from '../../../../application/users/create-user-admin.usecase';
import { IUserSystem } from '../../../../domain/model/user-system.model';
import { NotificationComponent } from '../../components/util/notification/notification.component';
import { NotificationService } from '../../components/util/notification/notification.service';

@Component({
  selector: 'lib-create-users',
  imports: [AsyncPipe, CreateUserFormComponent, NotificationComponent],
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateUserUsecase);
  private readonly notificationService = inject(NotificationService);

  public user$: Observable<IUserSystem>;
  private destroy$ = new Subject<void>();
  @ViewChild(CreateUserFormComponent) createUserFormComponent: CreateUserFormComponent;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }
  createUser(userAuth: IUserSystem): void {
    of(this._useCase.execute(userAuth))
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.user$),
        tap((response) => {
          console.log(response);
          if (response) {
            this.showToast('User created successfully', 'success');
            this.createUserFormComponent.resetForm();
          }
        }),
        catchError((err) => {
          return of(null);
        })
      )
      .subscribe();
  }

  showToast(messageToast: string, typeToast?: 'success' | 'error' | 'warning' | 'info') {
    this.notificationService.show({
      message: messageToast,
      type: typeToast,
      duration: 3000
    });
  }
}
