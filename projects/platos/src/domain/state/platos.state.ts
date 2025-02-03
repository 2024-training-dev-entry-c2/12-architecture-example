import { BehaviorSubject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IPlato } from '../model/platos.model';

@Injectable({
  providedIn: 'root',
})
export class PlatoState {
  private readonly _factory = inject(StateFactory);
  private readonly plato$ = new BehaviorSubject<IPlato[]>([]);
  private readonly currentPlato$ = new BehaviorSubject<IPlato>(null);

  store() {
    return {
      plato: this._factory.state(this.plato$),
      currentPlato: this._factory.state(this.currentPlato$),
    };
  }
}
