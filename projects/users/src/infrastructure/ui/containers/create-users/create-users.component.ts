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
  private destroy$ = new Subject<void>();
  showModal = false;
  modalMessage = 'Registro exitoso!';
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  register(formValue: IUser) {
    this._createUserUsecase.execute(formValue)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.showModal = true;
          this.authFormComponent.authForm.reset()

        },
        error: (error) => {
          this.errorMessage = 'Error en el registro. Por favor, inténtelo de nuevo.';
        }
      });
  }

  handleCloseModal(){
    this.showModal = false;
  }

}
