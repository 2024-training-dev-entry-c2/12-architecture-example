import { inject, Injectable } from "@angular/core";
import { Subscription, Observable, tap, delay, catchError, throwError } from "rxjs";
import { CreateUserService } from "../../infrastructure/services/create-user.service";
import { IUser, IUserRequest } from "../../domain/model/user.model";
import { State } from "../../domain/state";
import { LoaderService, ToastService } from "shared";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CreateUserUsecase {
    private readonly _service = inject(CreateUserService);
    private readonly _state = inject(State);
    private readonly _loaderService = inject(LoaderService)
    private readonly _toastService = inject(ToastService)
    private subscriptions: Subscription;


    users$(): Observable<IUser[]> {
        return this._state.users.users.$();
    }


    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(user: IUserRequest): void {
        this._loaderService.show();
        this.subscriptions.add(
            this._service.create(user)
                .pipe(
                    tap(() =>
                        this._toastService.emitToast(
                            'Success',
                            'User created',
                            'success',
                            true,
                            4000
                        )
                    ),
                    delay(2000),
                    tap(result => {
                        const newUser: IUser = {
                            username: result.username,
                            password: result.password
                        }
                        const users = this._state.users.users.snapshot();

                        this._state.users.users.set([...this._state.users.users.snapshot(), newUser]);

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