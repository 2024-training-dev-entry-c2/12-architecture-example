import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenu, IMenuResponse } from '../../domain/model/menu.model';
import { UpdateMenuService } from '../../infrastructure/services/update-menu.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUsecase {
  private readonly _updateMenuService = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  currentMenu$(): Observable<IMenuResponse> {
    return this._state.menus.currentMenu.$();
  }

  snapshotCurrentMenu(): IMenuResponse {
    return this._state.menus.currentMenu.snapshot();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menuId: number, payload: IMenu): void {
    this.subscriptions.add(
      this._updateMenuService
        .execute(menuId, payload)
        .pipe(
          tap((updatedMenu) => {
            const menus = this._state.menus.menuResponse.snapshot();
            const newMenus = menus.map((m) =>
              m.id === updatedMenu.id ? updatedMenu : m
            );
            this._state.menus.menuResponse.set(newMenus);
            this._state.menus.currentMenu.set(null);
          })
        )
        .subscribe()
    );
  }

  selectMenu(id: number): void {
    if (id === 0) {
      this._state.menus.currentMenu.set(null);
      return;
    }
    this._state.menus.currentMenu.set(
      this._state.menus.menuResponse.snapshot().find((c) => c.id === id)
    );
  }
}
