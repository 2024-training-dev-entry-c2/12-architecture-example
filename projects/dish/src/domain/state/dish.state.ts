import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { BehaviorSubject } from 'rxjs';
import { IDishResponse } from '../model/dish.model';
import { IMenuResponse } from 'menu';

@Injectable({
  providedIn: 'root',
})
export class DishState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly dishResponse$ = new BehaviorSubject<IDishResponse[][]>([]);
  private readonly menuResponse$ = new BehaviorSubject<IMenuResponse[]>([]);
  private readonly currentDish$ = new BehaviorSubject<IDishResponse>(null);
  //#endregion

  store() {
    return {
      dishResponse: this._factory.state(this.dishResponse$),
      menuResponse: this._factory.state(this.menuResponse$),
      currentDish: this._factory.state(this.currentDish$),
    };
  }
}
