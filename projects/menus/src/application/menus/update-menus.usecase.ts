import { inject, Injectable } from '@angular/core';
import { UpdateMenuService } from '../../infrastructure/services/update/update-menu.service';

import { Observable, Subscription, tap } from 'rxjs';
import { IMenu, IMenuRequest } from '../../domain/model/menu.model';
import { State } from '../../domain/state';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUsecase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  currentMenu$(): Observable<IMenu> {
    return this._state.menus.menu.$();
  }
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }


  execute(menu: IMenuRequest, id: number): void {
    this.subscriptions.add(
      this._service
        .updateMenu(menu, id)
        .pipe(
          tap((result: IMenu) => {
            const menus = this._state.menus.menus.snapshot();
            const updatedMenu = menus.map((menu) =>
              menu.id === id ? result : menu
            );
            this._state.menus.menus.set(updatedMenu);
          })
        )
        .subscribe()
    );
  }
  selectMenu(id: number): void {
    const currentMenu = this._state.menus.menus
      .snapshot()
      .find((blog) => blog.id === id);
    this._state.menus.menu.set(currentMenu);
  }
}
