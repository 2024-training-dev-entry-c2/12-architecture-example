import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenu } from '../domain/model/menu.model';
import { UpdateMenuService } from '../infrastructure/services/update-menu.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUseCase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentMenu$(): Observable<IMenu> {
    return this._state.menuState.currenMenu.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IMenu): void {
    this.subscriptions.add(
      this._service
        .execute(menu)
        .pipe(
          tap(() => {
            const menus = this._state.menuState.menu.snapshot();
            const newMenus = menus.map((m) => (m.id === menu.id ? menu : m));
            this._state.menuState.menu.set(newMenus);
            this._state.menuState.currenMenu.set(null);
          })
        )
        .subscribe()
    );
  }

  selectMenu(id: number): void {
    const currentMenu = this._state.menuState.menu
      .snapshot()
      .find((menu) => menu.id === id);
    this._state.menuState.currenMenu.set(currentMenu);
  }
  //#endregion
}
