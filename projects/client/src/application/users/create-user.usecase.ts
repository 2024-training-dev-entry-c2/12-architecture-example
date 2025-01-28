import { inject, Injectable } from "@angular/core";

import { State } from "../../domain/state";
import { Iclient } from "../../domain/model/client.model";
import { Observable, Subscription, tap } from "rxjs";
import { ClientService } from "../../infrastructure/services/client.service";

@Injectable({
  providedIn: 'root'
})
export class CreateUserUsecase {
  private readonly _service = inject(ClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  user$(): Observable<Iclient> {
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

  execute(user: Iclient): void {
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