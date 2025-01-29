import { inject, Injectable } from '@angular/core';
import { StateFactory } from './state.factory';
import { BehaviorSubject } from 'rxjs';
import { IMenu } from '../model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly menu$ = new BehaviorSubject<IMenu>(null);
  private readonly menus$ = new BehaviorSubject<IMenu[]>(null);

  //#endregion

  store() {
    return {
      menu: this._factory.state(this.menu$),
      menus: this._factory.state(this.menus$),
    };
  }
}
