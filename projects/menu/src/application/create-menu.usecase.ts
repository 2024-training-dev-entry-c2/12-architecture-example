import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { IMenu } from '../domain/models/menu.model';
import { State } from '../domain/state';
import { CreateMenuService } from '../infrastructure/services/create-menu.service';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //   #region Public methods
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
          tap((m) => {
            const menus = this._state.menuState.menus.snapshot();
            this._state.menuState.menus.set([...menus, m]);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
