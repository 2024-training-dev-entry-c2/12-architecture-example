import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFacotory } from 'shared';
import { Imenu } from '../model/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuState {
  private readonly _factory = inject(StateFacotory);

  //#region states de menu
  private readonly menus$ = new BehaviorSubject<Imenu[]>([]);
  private readonly menusUnique$ = new BehaviorSubject<Imenu>(null);
  //#endregion

  store() {
    return {
      menus: this._factory.stateFunctions(this.menus$),
      menu: this._factory.stateFunctions(this.menusUnique$),
    };
  }
}
