import { inject, Inject, Injectable } from "@angular/core";
import { CreateUserService } from "../infrastructure/services/create-user.service";
import { State } from "../domain/state";
import { Observable, Subject, Subscription, tap } from "rxjs";
import { IUser } from "../domain/model/user.model";

@Injectable({ providedIn: 'root' })
export class CreateUserUsecase {

    private readonly _createUserService = inject(CreateUserService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    private registrationSuccess$ = new Subject<void>();
    private registrationError$ = new Subject<string>();

    get onRegistrationSuccess(): Observable<void> {
        return this.registrationSuccess$.asObservable();
    }

    get onRegistrationError(): Observable<string> {
        return this.registrationError$.asObservable();
    }

    user$(): Observable<IUser> {
        return this._state.users.user.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(userData: IUser): void {
        this.subscriptions.add(
            this._createUserService.register(userData)
                .pipe(
                    tap(result => {
                        this._state.users.user.set(result);
                        this.registrationSuccess$.next();
                    })
                )
                .subscribe({
                    error: (error) => {
                        this.registrationError$.next('Error en el registro. Por favor, inténtelo de nuevo.'); 
                    }
                })
        );
    }

}