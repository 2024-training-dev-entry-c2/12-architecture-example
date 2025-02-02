import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFactory } from './state-factory';
import { IMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly _menus$ = new BehaviorSubject<IMenu[]>([]);
  private readonly _currentMenu$ = new BehaviorSubject<IMenu | null>(null);
  //#endregion

  store() {
    return {
      menus: this._factory.state(this._menus$),
      currentMenu: this._factory.state(this._currentMenu$),
    };
  }
}
