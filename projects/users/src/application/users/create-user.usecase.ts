import { inject, Injectable } from "@angular/core";
import { CreateUserService } from "../../infrastructure/services/create-user.service";
import { State } from "../../domain/state";
import { IUser } from "../../domain/model/users.model";
import { Observable, Subscription, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateUserUsecase {
  private readonly _service = inject(CreateUserService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  user$(): Observable<IUser> {
    return this._state.users.user.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(user: IUser): void {
    this.subscriptions.add(
      this._service.create(user)
        .pipe(
          tap(result => {
            this._state.users.user.set(result);

            // const users = this._state.users.user.snapshot();
            // this._state.users.user.set([...users, result])
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}