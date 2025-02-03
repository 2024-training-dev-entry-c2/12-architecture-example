// projects/auth/src/application/use-cases/login.use-case.ts
import { Injectable, inject } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IAuth, IAuthenticationResponse } from '../../domain/model/auth.model';
import { AuthService } from '../../infrastructure/services/auth.service';
import { State } from '../../domain/state';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class LoginUseCase {
    private readonly _service = inject(AuthService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    private router = inject(Router);
    private _alert = inject(ToastrService);

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(login: IAuth): void {
        this.subscriptions.add(
            this._service.login(login)
                .pipe(
                    tap(result => {
                        this._state.users.auth.set({
                            id: result.id,
                            email: result.email,
                            token: result.token,
                        });
                        
                    })
                )
                .subscribe(
                    {
                        next: finalResponse => {
                            this._alert.success('Usuario autenticado exitosamente');
                            this.router.navigate(['/dashboard']);
                        },
                        error: error => {
                            this._alert.error('Usuario o contraseña incorrectos');
                        }
                    }
                )
        );
    }
}