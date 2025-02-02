import { inject, Injectable } from '@angular/core';
import { StateFactory } from './state.factory';
import { BehaviorSubject } from 'rxjs';
import { IAdmin } from '../model/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminState {
  private readonly _factory = inject(StateFactory);

  private readonly _admin$ = new BehaviorSubject<IAdmin>(null);

  store() {
    return this._factory.state(this._admin$);
  }
}
