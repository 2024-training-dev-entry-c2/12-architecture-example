import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IUserRequest } from "../domain/model/user-request.model";
import { IUserResponse } from "../domain/model/user-response.model";
import { State } from "../domain/state";
import { SaveUserService } from "../infrastructure/services/save-user.service";
import { LoaderService } from "shared";

@Injectable({
    providedIn: 'root'
})
export class SaveUsersUseCase {
    private readonly _service = inject(SaveUserService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    private loaderService = inject(LoaderService);
  
    //#region Observables
    saveUser$(): Observable<IUserResponse> {
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
  
    execute(user: IUserRequest): void {
      this.loaderService.show(true);
      this.subscriptions.add(
        this._service.saveUser(user)
          .pipe(
            tap(result => {
                this._state.users.user.set(result);
                this._state.users.listUsers.set([...this._state.users.listUsers.snapshot(), result]);
                this.loaderService.show(false);
            })
          )
          .subscribe()
      );
    }
    //#endregion

}