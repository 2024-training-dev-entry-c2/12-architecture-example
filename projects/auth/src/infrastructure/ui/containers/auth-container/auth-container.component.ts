import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginUseCase } from '../../../../application/use-cases/login.use-case';
import { IAuthenticationResponse } from '../../../../domain/model/auth.model';
import { State } from '../../../../domain/state';
import { LoginComponent } from '../../components/login/login.component';
@Component({
  selector: 'lib-auth-container',
  imports: [LoginComponent
  ],
  templateUrl: './auth-container.component.html',
})
export class AuthContainerComponent {
  private readonly state = inject(State);
  private readonly _useCase = inject(LoginUseCase);
  public auth$: Observable<IAuthenticationResponse>;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this._useCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      this._useCase.execute(credentials);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}