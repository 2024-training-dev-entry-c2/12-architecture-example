import { inject, Injectable } from '@angular/core';
import { RemoveMenuService } from '../../infrastructure/services/remove/remove-menu.service';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveMenuUsecase {
  private readonly _service = inject(RemoveMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .deleteMenu(id)
        .pipe(
          tap(() => {
            const menus = this._state.menus.menus.snapshot();
            const updatedMenus = menus.filter((menu) => menu.id !== id);
            this._state.menus.menus.set(updatedMenus);
          })
        )
        .subscribe()
    );
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  //#endregion
}
