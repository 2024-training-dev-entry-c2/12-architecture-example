import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { IMenu } from '../domain/model/menu.model';
import { CreateMenuService } from '../infrastructure/services/create-menu.service';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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
          tap((menu) => {
            const menus = this._state.menuState.menu.snapshot();
            this._state.menuState.menu.set([...menus, menu]);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
