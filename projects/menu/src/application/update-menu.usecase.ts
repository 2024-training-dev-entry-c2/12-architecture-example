import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { IMenu } from '../domain/models/menu.model';
import { State } from '../domain/state';
import { UpdateMenuService } from '../infrastructure/services/update-menu.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUseCase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region observables
  currentMenu$(): Observable<IMenu> {
    return this._state.menuState.currentMenu.$();
  }
  //#endregion

  //#region Public methods
  initSubscriptions() {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenu, modal: ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute(menu)
        .pipe(
          tap((c) => {
            const menus = this._state.menuState.menus.snapshot();
            const newMenus = menus.map((cust) =>
              cust.menuId === c.menuId ? c : cust
            );
            this._state.menuState.menus.set(newMenus);
            this._state.menuState.currentMenu.set(null);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }

  selectMenu(menuId: number): void {
    const currentMenu = this._state.menuState.menus
      .snapshot()
      .find((c) => c.menuId === menuId);
    this._state.menuState.currentMenu.set(currentMenu);
  }
  //#endregion
}
