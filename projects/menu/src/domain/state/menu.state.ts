import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { BehaviorSubject } from 'rxjs';
import { IMenuResponse } from '../model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly menuResponse$ = new BehaviorSubject<IMenuResponse[]>([]);
  private readonly menuCustomer$ = new BehaviorSubject<IMenuResponse>(null);
  //#endregion

  store() {
    return {
      menuResponse: this._factory.state(this.menuResponse$),
      currentMenu: this._factory.state(this.menuCustomer$),
    };
  }
}
