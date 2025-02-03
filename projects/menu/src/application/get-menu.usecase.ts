import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IMenu} from "../domain/model/menu.model";
import { GetMenusService } from "../infrastructure/services/get-menus.service";

@Injectable({
  providedIn: 'root'
})
export class GetMenuUseCase {
  private readonly _service = inject(GetMenusService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  menus$(): Observable<IMenu[]> {
    return this._state.menuState.menu.$();
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
          tap(this._state.menuState.menu.set)
        ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}