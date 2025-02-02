import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { UpdateMenuService } from '../../infrastructure/services/update-menu.service';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuUsecase {
  private readonly _updateMenuService = inject(UpdateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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
          tap(() => {
            const menus = this._state.menus.menuResponse.snapshot();
            this._state.menus.menuResponse.set(
              menus.filter((m) => m.id !== menuId)
            );
          })
        )
        .subscribe()
    );
  }
}
