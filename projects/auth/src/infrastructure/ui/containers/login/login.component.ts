import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { LoginUseCase } from '../../../../application/admin/login.usecase';
import { LoginRequest } from '../../../../domain/model/login.request.model';

@Component({
  selector: 'lib-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _useCase = inject(LoginUseCase);

  ngOnInit(): void {
    this._useCase.initSubscription();
  }
  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }

  createAdmin(admin: LoginRequest): void {
    this._useCase.execute(admin);
  }
}
