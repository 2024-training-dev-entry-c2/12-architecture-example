import { BehaviorSubject } from 'rxjs';
import { IMenu } from '../model/menu.model';
import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { MenuState } from './menu.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _menu = inject(MenuState);

  get menuState() {
    return this._menu.store();
  }
}
