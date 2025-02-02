import { inject, Injectable } from "@angular/core";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteService } from "../../infrastructure/services/menu/delete.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuUsecase {
  private readonly _service = inject(DeleteService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.menus.message.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menuId: number) {
    this._service.execute(menuId).pipe(
      tap(result => {
        this._state.menus.message.set(result.message);
        const currentMenus = this._state.menus.listMenus.snapshot();
        this._state.menus.listMenus.set(currentMenus.filter(menu => menu.id !== menuId));
      }),
      finalize(() => this._state.menus.message.set(null))
    ).subscribe();
  }
  //#endregion
}