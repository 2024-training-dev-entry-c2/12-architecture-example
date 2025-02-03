import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { GetAllMenusService } from "../infrastructure/service/get-all-menus.service";
import { State } from "../domain/state";
import { IMenu } from "../domain/model/menu.model";

@Injectable({
  providedIn: 'root'
})
export class GetAllMenusUsecase {
  private readonly _service = inject(GetAllMenusService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.menus.allMenus.$();
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
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          tap(result => {
            this._state.menus.allMenus.set(result);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}