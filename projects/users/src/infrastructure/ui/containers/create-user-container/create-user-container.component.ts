import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserUsecase } from '../../../../application/users/create-user.usecase';
import { IUser, IUserCreate, IUserRequest } from '../../../../domain/model/user.model';
import { CreateUserFormComponent } from '../../forms/create-user-form/create-user-form.component';

@Component({
  selector: 'lib-create-user-container',
  imports: [CreateUserFormComponent],
  templateUrl: './create-user-container.component.html',
})
export class CreateUserContainerComponent implements OnInit, OnDestroy {

  @ViewChild(CreateUserFormComponent) form!: CreateUserFormComponent;
  
  private readonly _useCase = inject(CreateUserUsecase);

  ngOnInit(): void {
    this._useCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  createUser(user: IUserCreate): void {
    const newUser: IUserRequest = {
      username: user.username,
      password: user.password,
      roles: "user"

    }
    this._useCase.execute(newUser);
    this._useCase.users$().subscribe(users => {
      const found: boolean = users.some(
        user => user.username === newUser.username 
      );
      if (found) {
        this.form.clear();
      }
    });

  }

}
