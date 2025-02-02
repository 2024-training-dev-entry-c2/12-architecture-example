import { inject, Injectable } from '@angular/core';
import { StateFactory } from './state.factory';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminsState {
  private readonly _factory = inject(StateFactory);

  private readonly _admins$ = new BehaviorSubject<IUser[]>([]);

  store() {
    return this._factory.state(this._admins$);
  }
}
