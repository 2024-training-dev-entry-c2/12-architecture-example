import { Injectable, inject } from '@angular/core';
import { DishesState } from './dish.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _dishes = inject(DishesState);

  get dishesState() {
    return this._dishes.store();
  }
}
