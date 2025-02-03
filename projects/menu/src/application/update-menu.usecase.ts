import { inject, Injectable } from '@angular/core';
import { StateIndexMenu } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { Imenu } from '../domain/model/menu.model';
import { UpdateMenuService } from '../infrastructure/services/update-menu.service';

@Injectable({ providedIn: 'root' })
export class UpdateMenuUseCase {
  private readonly _service = inject(UpdateMenuService);
  private readonly _state = inject(StateIndexMenu);
  private subscription: Subscription;

  currentMenu$(): Observable<Imenu> {
    return this._state.stateMenu.menu.$();
  }

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
          tap((item) => {
            const allMenus = this._state.stateMenu.menus.valueState();
            const newMenu = allMenus.map((mn) =>
              mn.id === item.id ? item : mn
            );
            this._state.stateMenu.menus.changeState(newMenu);
            this._state.stateMenu.menu.changeState(null);
          })
        )
        .subscribe()
    );
  }

  selectMenu(id: number): void {
    const menu = this._state.stateMenu.menus
      .valueState()
      .find((mn) => mn.id === id);
    this._state.stateMenu.menu.changeState(menu);
  }
}
