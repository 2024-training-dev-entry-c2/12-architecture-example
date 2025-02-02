import { inject, Injectable } from '@angular/core';
import { AdminState } from './admin.state';
import { AdminsState } from './admins.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _admin = inject(AdminState);
  private readonly _admins = inject(AdminsState);

  get admin() {
    return this._admin.store();
  }

  get admins() {
    return this._admins.store();
  }
}
