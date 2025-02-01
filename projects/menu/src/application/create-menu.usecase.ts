import { inject, Injectable } from '@angular/core';
import { StateIndexMenu } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { Imenu } from '../domain/model/menu.model';
import { CreateMenuService } from '../infrastructure/services/create-menu.service';

@Injectable({ providedIn: 'root' })
export class CreateMenuUseCase {
  private readonly _service = inject(CreateMenuService);
  private readonly _state = inject(StateIndexMenu);
  private subscription: Subscription;

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  execute(menu: Imenu): void {
    this.subscription.add(
      this._service
        .execute(menu)
        .pipe(
          tap((menuNew) => {
            const allMenus = this._state.stateMenu.menus.valueState();
            this._state.stateMenu.menus.changeState([...allMenus, menuNew]);
          })
        )
        .subscribe()
    );
  }
}
