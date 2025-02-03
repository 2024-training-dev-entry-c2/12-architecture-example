import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { delay, finalize, Observable, Subscription, tap } from "rxjs";
import { CreateMenuService } from "../infrastructure/services/create-menu.service";
import { IMenu } from "../domain/model/menu.model";

@Injectable({
  providedIn: 'root'
})
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  message$(): Observable<string> {
    return this._state.menu.message.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenu) {
    this.subscriptions.add(
      this._service.execute(menu).pipe(
        tap(result => {
          this._state.menu.message.set('Menu creado con éxito');
          const currentMenu = this._state.menu.showMenus.snapshot();
          this._state.menu.showMenus.set([...currentMenu, result]);
        }),
        delay(2000),
        finalize(() => {
          this._state.menu.open.set(false);
          this._state.menu.message.set('');
        })
      ).subscribe()
    );
  }
  //#endregion
}