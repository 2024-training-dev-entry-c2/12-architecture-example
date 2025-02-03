import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IMenu } from "../domain/model/menu.model";
import { GetMenuService } from "../infrastructure/service/get-menu.service";

@Injectable({
  providedIn: 'root'
})
export class GetMenuUseCase {
  private readonly _service = inject(GetMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentMenu$(): Observable<IMenu> {
    return this._state.menus.currentMenu.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  clearSelectedMenu() {
    this._state.menus.currentMenu.set(null);
  }

  execute(id: number): Observable<IMenu> {
    return this._service.execute(id).pipe(
      tap(menu => {
        this._state.menus.currentMenu.set(menu);
      })
    );
  }


  //#endregion

  //#region Private Methods
  //#endregion
}