import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonCreateComponent } from '../../components/button-create/button-create.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent, AlertService } from 'shared';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { SaveUserUseCase } from '../../../../application/users/save-user.usecase';
import { IUserResponseDTO } from '../../../../domain/model/user.response.model';
import { Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-user',
  imports: [ButtonCreateComponent, ModalCreateComponent, AlertComponent],
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(SaveUserUseCase);
  public userSave$: Observable<IUserResponseDTO>;
  public router = inject(Router);

  title = 'Usuarios';
  subtitle = 'Registra un nuevo usuario para acceder al sistema';
  button_name = 'Registrarse';
  icon =
    'M12 21c4.411 0 8-3.589 8-8 0-3.358-2.051-6.235-5-7.452v-0.296c0-1.355-1.053-2.447-2.432-2.447-1.379 0-2.432 1.091-2.432 2.447v0.296c-2.949 1.216-5 4.093-5 7.452 0 4.411 3.589 8 8 8zm0-16c2.206 0 4 1.794 4 4 0 2.206-1.794 4-4 4-2.206 0-4-1.794-4-4 0-2.206 1.794-4 4-4z';
  showModal = false;
  registerForm: FormGroup;

  showAlert = false;
  alertMessage = '';
  alertType = '';

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private alertService: AlertService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.alertService.alert$
      .pipe(takeUntil(this.destroy$))
      .subscribe((alert) => {
        if (alert) {
          debugger;
          this.showAlert = true;
          this.alertMessage = alert.message;
          this.alertType = alert.type;
        } else {
          this.showAlert = false;
          this.alertService.closeAlert();
        }
      });
  }
  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }
  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.userSave$ = this._useCase.userSave$();
  }

  actionClick() {
    this.showModal = true;
    this.showAlert = false;
  }

  createUser(form: FormGroup): void {
    this.showModal = false; //Cerrar el modal
    of(this._useCase.execute(this.registerForm.getRawValue()))
      .pipe(
        switchMap(() => this.userSave$),
        tap((response) => {
          if (response?.email) {
            this.alertService.showAlert(
              'El usuario se ha registrado correctamente.',
              'success'
            );
            this.registerForm.reset();
            return true;
          } else {
            return false;
          }
        })
      )
      .subscribe();

    //
    console.log('Data de formulario ' + form.value);
  }

  closeAlert() {
    this.showAlert = false;
    this.showModal = false;
  }
}
