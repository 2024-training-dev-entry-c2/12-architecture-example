import { inject, Injectable } from '@angular/core';
import { DishState } from './dish.state';

@Injectable({ providedIn: 'root' })
export class StateIndesDish {
  private readonly _stateDish = inject(DishState);

  get dishState() {
    return this._stateDish.store();
  }
}
