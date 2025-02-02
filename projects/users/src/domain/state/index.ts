import { inject, Injectable } from '@angular/core';
import { UsersState } from './users.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _users = inject(UsersState);

  get users() {
    return this._users.store();
  }
}
