import { Injectable, inject } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IAuth, IAuthenticationResponse } from '../../domain/model/auth.model';
import { State } from '../../domain/state';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../infrastructure/services/auth.service';
import { error } from 'console';

@Injectable({
    providedIn: 'root'
})
export class RegisterUseCase {
    private readonly _service = inject(AuthService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    private readonly _alert = inject(ToastrService);

    //#region Observables
    userSave$(): Observable<IAuthenticationResponse> {
        return this._state.users.userSave.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(userData: IAuth): void {
        this.subscriptions.add(
            this._service.register(userData)
                .pipe(
                    tap((result) => {
                        
                        this._state.users.userSave.set({
                            id: result.id,
                            email: result.email,
                            token: result.token,
                        });

                    })
                )
                .subscribe({
                    next: () => {
                        this._alert.success('Usuario registrado exitosamente');
                    },
                    error: error => {
                        this._alert.error('Error en el registro, intentelo de nuevo');
                    }
                })
        );
    }
    //#endregion
}