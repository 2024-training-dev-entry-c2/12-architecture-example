import { inject, Injectable } from "@angular/core";
import { AuthenticateUserService, ILoginResponse } from "../../infrastructure/services/authenticate-user.service";
import { State } from "../../domain/state";
import { catchError, delay, Observable, Subscription, tap, throwError } from "rxjs";
import { IUser } from "../../domain/model/user.model";
import { Router } from "@angular/router";
import { LoaderService, ToastService } from "shared";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class AuthenticateUseCase {
    private readonly _service = inject(AuthenticateUserService);
    private readonly _state = inject(State);
    private readonly _router = inject(Router);
    private readonly _loaderService = inject(LoaderService)
    private readonly _toastService = inject(ToastService)


    private subscriptions: Subscription;



    authInfo$(): Observable<ILoginResponse> {
        return this._state.users.authInfo.$();
    }


    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(user: IUser): void {
        this._loaderService.show();
        this.subscriptions.add(
            this._service.login(user)
                .pipe(
                    tap(() =>
                        this._toastService.emitToast(
                            'Success',
                            'Access granted',
                            'success',
                            true,
                            4000
                        )
                    ),
                    delay(2000),
                    tap(result => {
                        this._state.users.authInfo.set(result);
                        this._router.navigate(['users/dashboard']);
                    }),
                    tap(() => this._loaderService.hide()),
                    catchError((error: HttpErrorResponse) => {
                        switch (error.status) {
                            case 500:
                                this._toastService.emitToast(
                                    'Error',
                                    error.error.details[0],
                                    'error',
                                    true,
                                    4000
                                );
                                break;
                        }

                        return throwError(() => error);
                    })
                )
                .subscribe()
        );
    }

}