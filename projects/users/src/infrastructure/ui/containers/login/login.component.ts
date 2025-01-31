import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthFormComponent } from '../../forms/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { IUser } from '../../../../domain/model/user.model';
import { AuthUserUsecase } from '../../../../application/auth-user.usecase';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HomeComponentComponent } from "../../components/home-component/home-component.component";

@Component({
  selector: 'lib-login',
  imports: [AuthFormComponent, HomeComponentComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private readonly _authUserUsecase = inject(AuthUserUsecase);
  public user$: Observable<IUser>;
  private destroy$ = new Subject<void>();

  inputsConfig = [
    { label: 'Nombre de Usuario', formControlName: 'username', type: 'text' as const },
    { label: 'Contraseña', formControlName: 'password', type: 'password' as const },
  ];


  constructor(private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.user$ = this._authUserUsecase.user$();
    this._authUserUsecase.initSubscriptions();


    this._authUserUsecase.onLoginError
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMessage) => {
        this.errorMessage = errorMessage;
      });
  }

  ngOnDestroy(): void {
    this._authUserUsecase.destroySubscriptions();
  }

  login(formValue: IUser) {
    this._authUserUsecase.execute(formValue);
  }
}
