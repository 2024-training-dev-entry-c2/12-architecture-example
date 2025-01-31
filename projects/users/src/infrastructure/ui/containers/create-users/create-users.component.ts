import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthFormComponent } from "../../forms/auth-form/auth-form.component";
import { Router } from '@angular/router';
import { CreateUserUsecase } from '../../../../application/create-user.usecase';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IUser } from '../../../../domain/model/user.model';
import { InformativeModalComponent } from 'shared';

@Component({
  selector: 'lib-create-users',
  imports: [AuthFormComponent, InformativeModalComponent],
  templateUrl: './create-users.component.html',
})
export class CreateUsersComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private readonly _createUserUsecase = inject(CreateUserUsecase);
  public user$: Observable<IUser>;
  showModal = false;
  modalMessage = 'Registro exitoso!';
  private destroy$ = new Subject<void>();

  @ViewChild(AuthFormComponent) authFormComponent!: AuthFormComponent;

  inputsConfig = [
    { label: 'Nombre de Usuario', formControlName: 'username', type: 'text' as const },
    { label: 'Contraseña', formControlName: 'password', type: 'password' as const },
    {
      label: 'Rol',
      formControlName: 'roles',
      type: 'select' as const,
      options: [
        { value: 'USER', label: 'Usuario' },
        { value: 'ADMIN', label: 'Administrador' },
      ],
    },
  ];


  constructor(private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.user$ = this._createUserUsecase.user$();
    this._createUserUsecase.initSubscriptions();

    this._createUserUsecase.onRegistrationSuccess
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showModal = true;
        this.authFormComponent.authForm.reset();
      });

    this._createUserUsecase.onRegistrationError
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMessage) => {
        this.errorMessage = errorMessage;
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._createUserUsecase.destroySubscriptions();
  }

  register(formValue: IUser) {
    this._createUserUsecase.execute(formValue)
  }

  handleCloseModal() {
    this.showModal = false;
  }

}
