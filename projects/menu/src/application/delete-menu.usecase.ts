import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { DeleteMenuService } from '../infrastructure/services/delete-menu.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuUseCase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap(() => {
            const menus = this._state.menuState.menu.snapshot();
            this._state.menuState.menu.set(menus.filter((unMenu)=> unMenu.id != id));
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
