import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IUserResponse } from "../domain/model/user-response.model";
import { State } from "../domain/state";
import { GetAllUsersService } from "../infrastructure/services/get-all-users.service";
import { LoaderService } from "shared";

@Injectable({
    providedIn: 'root'
})
export class GetAllUsersUseCase {
    private readonly _service = inject(GetAllUsersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    private loaderService = inject(LoaderService);
  
    //#region Observables
    listUsers$(): Observable<IUserResponse[]> {
      return this._state.users.listUsers.$();
    }
    //#endregion
  
    //#region Public Methods
    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }
  
    execute(): void {
      this.loaderService.show(true);
      this.subscriptions.add(
        this._service.getAllUsers()
          .pipe(
            tap(result => {
                this._state.users.listUsers.set(result);
                this.loaderService.show(false);
            })
          )
          .subscribe()
      );
    }
    //#endregion

} 