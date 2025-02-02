import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';
import { RegisterUseCase } from '../../../../application/admin/register.usecase';
import { RegisterRequest } from '../../../../domain/model/register.request.model';

@Component({
  selector: 'lib-register',
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(RegisterUseCase);

  ngOnInit(): void {
    this._useCase.initSubscription();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }

  createUser(user: RegisterRequest): void {
    this._useCase.execute(user);
  }
}
