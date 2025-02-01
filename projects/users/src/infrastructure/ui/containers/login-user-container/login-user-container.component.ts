import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { Observable } from 'rxjs';
import { CreateUserUsecase } from '../../../../application/users/create-user.usecase';
import { IUser } from '../../../../domain/model/user.model';
import { AuthenticateUseCase } from '../../../../application/users/authenticate-user.usecase';

@Component({
  selector: 'lib-login-user-container',
  imports: [LoginFormComponent],
  templateUrl: './login-user-container.component.html',
})
export class LoginUserContainerComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(AuthenticateUseCase);
  public user$: Observable<IUser>;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  createUser(user: IUser): void {
    this._useCase.execute(user);
  }

}
