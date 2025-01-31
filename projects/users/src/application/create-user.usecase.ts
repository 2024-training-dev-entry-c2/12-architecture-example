import { inject, Inject, Injectable } from "@angular/core";
import { CreateUserService } from "../infrastructure/services/create-user.service";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IUser } from "../domain/model/user.model";

@Injectable({ providedIn: 'root' })
export class CreateUserUsecase {

    private readonly _createUserService = inject(CreateUserService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    user$(): Observable<IUser> {
        return this._state.users.user.$();
    }

    execute(userData: IUser): Observable<IUser> {
        return this._createUserService.register(userData)
            .pipe(
                tap(result => {
                    this._state.users.user.set(result);
                })
            );
    }

}