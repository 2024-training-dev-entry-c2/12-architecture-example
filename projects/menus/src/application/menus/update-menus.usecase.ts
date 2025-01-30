import { inject, Injectable } from '@angular/core';
import { UpdateMenuService } from '../../infrastructure/services/update/update-menu.service';

import { Subscription, tap } from 'rxjs';
import { IMenu, IMenuRequest } from '../../domain/model/menu.model';
import { State } from '../../domain/state';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUsecase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

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
}
