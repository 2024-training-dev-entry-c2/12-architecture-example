import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateUserUsecase } from '../../../../application/users/create-user.usecase';
import { Observable } from 'rxjs';
import { IUser } from '../../../../domain/model/users.model';
import { AsyncPipe } from '@angular/common';
import { CreateUserFormComponent } from '../../forms/create-user-form/create-user-form.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'lib-create-users',
  imports: [AsyncPipe, CreateUserFormComponent, HeaderComponent],
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(CreateUserUsecase);
  public user$: Observable<IUser>;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  createUser(user: IUser): void {
    this._useCase.execute(user);
  }
}
