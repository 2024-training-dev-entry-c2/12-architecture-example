import { inject, Injectable } from '@angular/core';
import { MenuState } from './menu.state';

@Injectable({ providedIn: 'root' })
export class StateIndexMenu {
  private readonly _stateMenu = inject(MenuState);

  get stateMenu() {
    return this._stateMenu.store();
  }
}
