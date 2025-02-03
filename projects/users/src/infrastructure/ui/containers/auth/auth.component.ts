import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderComponent, ToastComponent, ToastService, TokenService } from 'shared';
import { AuthUserUseCase } from '../../../../application/auth-user.usecase';
import { AuthFormComponent } from "../../forms/auth-form/auth-form.component";

@Component({
  selector: 'lib-auth',
  imports: [AuthFormComponent, LoaderComponent, ToastComponent],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  private readonly _useCase = inject(AuthUserUseCase);
  private authvalidate$ = new Subject<void>();
  private router = inject(Router);
  private fb = inject(FormBuilder);
  tokenService = inject(TokenService);
  toastService = inject(ToastService);

  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if(this.tokenService.isAuthenticated()) {
      this.router.navigate(['']);
    } else {
      this._useCase.initSubscriptions();
    }
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();

    this.authvalidate$.next();
    this.authvalidate$.complete();
  }

  auth() {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this._useCase.execute(this.authForm.getRawValue())
    } else {
      this.toastService.emitToast("Error", "Inconsistency in fields", "error", true);
    }
  }

  get getEmail(): string {
    return this.authForm.value.email ?? '';
  }

}