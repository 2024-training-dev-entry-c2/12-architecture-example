import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { UserSystemService } from "../../infrastructure/services/user-system.service";
import { IUserSystem } from "../../domain/model/user-system.model";

@Injectable({
  providedIn: 'root'
})
export class CreateUserUsecase {
  private readonly _service = inject(UserSystemService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  user$(): Observable<IUserSystem> {
    return this._state.users.userAdmin.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(user: IUserSystem): void {
    this.subscriptions.add(
      this._service.createUserAdmin(user)
        .pipe(
          tap(result => {
            console.log("llega al create");
            this._state.users.userAdmin.set(result);

          })
        )
        .subscribe()
    );
  }
  //#endregion

}