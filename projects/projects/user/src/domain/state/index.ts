import { inject, Injectable } from "@angular/core";
import { UsersState } from "./user.state";
@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _users = inject(UsersState);

  get users() {
    return this._users.store();
  }
}