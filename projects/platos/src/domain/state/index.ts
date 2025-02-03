import { inject, Injectable } from '@angular/core';
import { PlatoState } from './platos.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _plato = inject(PlatoState);

  get platoState() {
    return this._plato.store();
  }
}
